
"use server"

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function addFunds(amount: number, userId: string, description: string = 'User-added funds') {
    const supabase = createAdminClient();

    if (!userId) {
        const errorMsg = "User ID is required to add funds.";
        console.error(`addFunds Error: ${errorMsg}`);
        return { error: errorMsg };
    }
    console.log(`[addFunds] Starting for user: ${userId}, amount: ${amount}`);

    // 1. Get the user profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', userId)
        .single();
    
    if (profileError || !profile) {
        const errorMsg = `Failed to retrieve user profile for user ${userId}. Does profile exist?`;
        console.error(`[addFunds] Profile Error: ${errorMsg}`, profileError);
        return { error: errorMsg };
    }

    console.log(`[addFunds] Found profile for user ${userId}. Current balance: ${profile.balance}`);

    // 2. Calculate new balance and update the profile
    const newBalance = (profile.balance ?? 0) + amount;
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('id', userId);

    if (updateError) {
        const errorMsg = `Failed to update balance for user ${userId}.`;
        console.error(`[addFunds] Update Error: ${errorMsg}`, updateError);
        return { error: errorMsg };
    }
    
    console.log(`[addFunds] Successfully updated balance for user ${userId} to ${newBalance}`);

    // 3. Create a transaction record
    const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
            user_id: userId,
            amount: amount,
            type: 'deposit',
            description: description
        });

    if (transactionError) {
        const errorMsg = `Failed to create transaction for user ${userId}. Balance was updated, but transaction log failed.`;
        console.error(`[addFunds] Transaction Error: ${errorMsg}`, transactionError);
        // Note: In a real-world app, you'd want to handle this inconsistency.
        return { error: errorMsg };
    }

    console.log(`[addFunds] Successfully created transaction record for user ${userId}.`);

    // 4. Revalidate paths to update cache
    revalidatePath('/dashboard');
    revalidatePath('/exclusive-leads');

    console.log(`[addFunds] Success: Revalidated paths for user ${userId}.`);
    return { success: true, error: null };
}
