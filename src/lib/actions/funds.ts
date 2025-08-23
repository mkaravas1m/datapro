
"use server"

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function addFunds(amount: number, userId: string, description: string = 'User-added funds') {
    // Use the admin client to bypass RLS for all trusted server-side operations.
    const supabase = createAdminClient();

    if (!userId) {
        const errorMsg = "User ID is required to add funds.";
        console.error(`addFunds Error: ${errorMsg}`);
        return { error: errorMsg };
    }

    // 1. Get the current balance
    let currentBalance = 0;
    try {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', userId)
            .single();
        
        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means "No rows found", which is okay for a new user.
            throw profileError;
        }

        if (profile) {
            currentBalance = profile.balance ?? 0;
        }
    } catch(error: any) {
        const errorMsg = `Failed to retrieve user profile for user ${userId}.`;
        console.error(`addFunds Error: ${errorMsg}`, error);
        return { error: errorMsg };
    }


    // 2. Update the balance
    const newBalance = currentBalance + amount;
    try {
        const { error: upsertError } = await supabase
            .from('profiles')
            .upsert({ id: userId, balance: newBalance, updated_at: new Date().toISOString() }, { onConflict: 'id' });

        if (upsertError) {
            throw upsertError;
        }
    } catch (error: any) {
        const errorMsg = `Failed to update balance for user ${userId}.`;
        console.error(`addFunds Error: ${errorMsg}`, error);
        return { error: errorMsg };
    }

    // 3. Create a transaction record
    try {
        const { error: transactionError } = await supabase
            .from('transactions')
            .insert({
                user_id: userId,
                amount: amount,
                type: 'deposit',
                description: description
            });

        if (transactionError) {
            throw transactionError;
        }
    } catch (error: any) {
        const errorMsg = `Failed to create transaction for user ${userId}.`;
        console.error(`addFunds Error: ${errorMsg}`, error);
        // Note: In a real-world app, you might want to roll back the balance update here.
        return { error: errorMsg };
    }

    console.log(`addFunds Success: Revalidating paths for user ${userId}.`);
    revalidatePath('/dashboard');
    revalidatePath('/exclusive-leads');

    return { error: null, success: true };
}
