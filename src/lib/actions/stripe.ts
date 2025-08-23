
"use server"

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { addFunds } from "./funds";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(amount: number) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to add funds." };
    }
    
    if (amount < 5) {
        return { error: "Amount must be at least $5.00." };
    }

    const origin = headers().get('origin')!;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'DataSalesPro Balance Top-up',
                            description: `Add $${amount.toFixed(2)} to your account balance.`,
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard?payment=cancelled`,
            metadata: {
                userId: user.id,
                amount: amount.toString(),
            },
        });
        
        return { url: session.url, error: null };
    } catch (error: any) {
        console.error("Error creating Stripe session: ", error);
        return { error: "Could not create checkout session.", url: null };
    }
}

export async function verifyPaymentAndUpdateBalance(sessionId: string) {
    if (!sessionId) {
        return { error: "Session ID is required." };
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const userId = session.metadata?.userId;
            const amountStr = session.metadata?.amount;

            if (!userId || !amountStr) {
                return { error: "Missing metadata in Stripe session." };
            }
            const amount = parseFloat(amountStr);

            // Check if this transaction has already been processed
            const supabase = createClient();
            const { data: existingTransaction, error: transactionCheckError } = await supabase
                .from('transactions')
                .select('id')
                .eq('description', `Stripe payment: ${session.id}`)
                .single();

            if (transactionCheckError && transactionCheckError.code !== 'PGRST116') { // Ignore "No rows found" error
                 console.error("Error checking for existing transaction:", transactionCheckError);
                 return { error: "Failed to verify transaction." };
            }

            if (existingTransaction) {
                return { success: true, message: "Payment already processed." };
            }

            // Fulfill the purchase...
            const result = await addFunds(amount, userId, `Stripe payment: ${session.id}`);

            if (result.error) {
                return { error: `Failed to add funds: ${result.error}` };
            }
            
            revalidatePath('/dashboard');
            return { success: true };
        } else {
            return { error: "Payment not successful." };
        }
    } catch (error: any) {
        console.error("Error verifying Stripe session:", error);
        return { error: "Failed to verify payment." };
    }
}
