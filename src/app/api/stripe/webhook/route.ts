
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { addFunds } from '@/lib/actions/funds';
import { createAdminClient } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('✅ Webhook: Received checkout.session.completed event for session:', session.id);


    const userId = session?.metadata?.userId;
    const amountStr = session?.metadata?.amount;
    
    if (!userId || !amountStr) {
      console.error('❌ Webhook Error: Missing userId or amount in metadata for session:', session.id);
      return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
    }
    
    const amount = parseFloat(amountStr);

    // Prevent duplicate transactions by checking for the stripe session id
    const supabase = createAdminClient();
    try {
        const { data: existingTransaction, error: checkError } = await supabase
            .from('transactions')
            .select('id')
            .eq('description', `Stripe payment: ${session.id}`)
            .maybeSingle();

        if (checkError) {
            console.error('❌ Webhook Error: Failed to check for existing transaction.', checkError);
            // Decide if you should continue or not. For now, we will continue but log the error.
        }
        
        if(existingTransaction) {
            console.log('✅ Webhook: Payment already processed for session:', session.id);
            return new NextResponse('OK - Already processed', { status: 200 });
        }
    } catch(error: any) {
        console.error('❌ Webhook Error: Catastrophic failure during transaction check.', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }


    try {
        console.log(`⏳ Webhook: Attempting to add funds for user ${userId}, amount ${amount}`);
        const result = await addFunds(amount, userId, `Stripe payment: ${session.id}`);
        if (result.error) {
          throw new Error(result.error);
        }
        console.log(`✅ Webhook: Successfully added $${amount} to user ${userId} for session ${session.id}`);
    } catch(error: any) {
        console.error(`❌ Webhook Error: Failed to update user balance for session ${session.id}. Error:`, error.message);
        // In a production app, you might want to send an alert here.
        return new NextResponse('Webhook handler failed.', { status: 500 });
    }
  }

  return new NextResponse('OK', { status: 200 });
}
