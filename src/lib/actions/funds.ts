
"use server"

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function addFunds(amount: number, userId: string, description: string = 'User-added funds') {
    // Use the admin client to bypass RLS for this trusted server-side operation.
    const supabase = createAdminClient();

    if (!userId) {
        return { error: "User ID is required to add funds." };
    }

    // First, try to get the current balance
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', userId)
        .single();
    
    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error('Error fetching profile:', profileError);
        return { error: "Could not retrieve user profile." };
    }

    // If profile exists, update it. Otherwise, create it.
    const currentBalance = profile?.balance ?? 0;
    const newBalance = currentBalance + amount;
    
    const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({ id: userId, balance: newBalance, full_name: '' }, { onConflict: 'id' });

    if (upsertError) {
        console.error('Error upserting balance:', upsertError);
        return { error: "Failed to update balance." };
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
        console.error('Error creating transaction:', transactionError);
        // Note: In a real-world app, you might want to roll back the balance update here.
        return { error: "Failed to record transaction." };
    }

    revalidatePath('/dashboard');
    revalidatePath('/exclusive-leads');

    return { error: null };
}
