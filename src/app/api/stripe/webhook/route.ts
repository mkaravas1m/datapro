
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { addFunds } from '@/lib/actions/funds';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session?.metadata?.userId;
    const amountStr = session?.metadata?.amount;
    
    if (!userId || !amountStr) {
      return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
    }

    const amount = parseFloat(amountStr);

    // Prevent duplicate transactions
     const supabase = createClient();
     const { data: existingTransaction } = await supabase
         .from('transactions')
         .select('id')
         .eq('description', `Stripe payment: ${session.id}`)
         .single();
    
    if(existingTransaction) {
        console.log('✅ Webhook: Payment already processed.');
        return new NextResponse('OK', { status: 200 });
    }

    try {
        await addFunds(amount, userId, `Stripe payment: ${session.id}`);
        console.log(`✅ Successfully added $${amount} to user ${userId}`);
    } catch(error: any) {
        console.error('Failed to update user balance via webhook:', error);
        return new NextResponse('Webhook handler failed.', { status: 500 });
    }
  }

  return new NextResponse('OK', { status: 200 });
}
