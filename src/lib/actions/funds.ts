
"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addFunds(amount: number) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to add funds." };
    }

    // First, get the current balance
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user.id)
        .single();
    
    if (profileError || !profile) {
        return { error: "Could not retrieve user profile." };
    }

    const newBalance = profile.balance + amount;

    // Update the balance
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('id', user.id);
    
    if (updateError) {
        return { error: "Failed to update balance." };
    }

    // Create a transaction record
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
