
"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addFunds(amount: number, userId: string, description: string = 'User-added funds') {
    const supabase = createClient();

    // In a webhook context, we get the userId directly, so we don't need to fetch the user again.
    if (!userId) {
        return { error: "User ID is required to add funds." };
    }

    // First, try to get the current balance
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', userId)
        .single();
    
    // If profile exists, update it
    if (profile) {
      const newBalance = profile.balance + amount;
      const { error: updateError } = await supabase
          .from('profiles')
          .update({ balance: newBalance })
          .eq('id', userId);
      
      if (updateError) {
          return { error: "Failed to update balance." };
      }
    } else {
       // This case is less likely in the webhook flow if a profile is always created on sign-up,
       // but it's good practice to handle it.
      const { error: createError } = await supabase
        .from('profiles')
        .insert({ id: userId, balance: amount });
      
      if (createError) {
        return { error: "Failed to create user profile." };
      }
    }


    // Create a transaction record
    const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
            user_id: userId,
            amount: amount,
            type: 'deposit',
            description: description
        });

    if (transactionError) {
        // Note: In a real-world app, you might want to roll back the balance update here.
        return { error: "Failed to record transaction." };
    }

    revalidatePath('/dashboard');
    revalidatePath('/exclusive-leads');

    return { error: null };
}
