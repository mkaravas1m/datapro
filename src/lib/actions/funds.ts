
"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addFunds(amount: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to add funds." };
    }

    // First, try to get the current balance
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('balance, full_name')
        .eq('id', user.id)
        .single();
    
    // If profile exists, update it
    if (profile) {
      const newBalance = profile.balance + amount;
      const { error: updateError } = await supabase
          .from('profiles')
          .update({ balance: newBalance })
          .eq('id', user.id);
      
      if (updateError) {
          return { error: "Failed to update balance." };
      }
    } else {
      // If profile does not exist, create it.
      // This can happen for new users if the DB trigger hasn't run yet.
      const { error: createError } = await supabase
        .from('profiles')
        .insert({ id: user.id, balance: amount, full_name: user.user_metadata.full_name ?? 'New User' });
      
      if (createError) {
        return { error: "Failed to create user profile." };
      }
    }


    // Create a transaction record regardless of whether it was an update or insert
    const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
            user_id: user.id,
            amount: amount,
            type: 'deposit',
            description: 'User-added funds'
        });

    if (transactionError) {
        // Note: In a real-world app, you might want to roll back the balance update here.
        return { error: "Failed to record transaction." };
    }

    revalidatePath('/dashboard');
    revalidatePath('/exclusive-leads');

    return { error: null };
}
