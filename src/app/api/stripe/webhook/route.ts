
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { addFunds } from '@/lib/actions/funds'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.userId;
      const amountStr = session.metadata?.amount;

      if (!userId || !amountStr) {
        console.error('Webhook Error: Missing metadata for userId or amount');
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      const amount = parseFloat(amountStr);

      if (isNaN(amount)) {
        console.error('Webhook Error: Invalid amount in metadata');
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
      }
      
      // Fulfill the purchase...
      const result = await addFunds(amount, userId, `Stripe payment: ${session.id}`);
      
      if (result.error) {
        console.error(`Failed to add funds for user ${userId}: ${result.error}`);
        // You might want to handle this case, e.g., by sending an alert
        // For now, we will return a 500 status to let Stripe know something went wrong
        return NextResponse.json({ error: 'Failed to update user balance.' }, { status: 500 });
      }
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
