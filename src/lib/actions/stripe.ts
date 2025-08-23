
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
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/dashboard?payment=success`,
            cancel_url: `${origin}/dashboard?payment=cancelled`,
            metadata: {
                userId: user.id,
                amount: amount.toString(),
            },
        });
        
        return { url: session.url, error: null };
    } catch (error: any) {
        console.error("Error creating Stripe session: ", error.message);
        return { error: "Could not create checkout session.", url: null };
    }
}
