
"use server"

import { createClient } from "@/lib/supabase/server";
import type { CsvFile } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getFiles(): Promise<CsvFile[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('csv_files').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching files: ", error);
        return [];
    }
    return data as CsvFile[];
}

export async function updateFileStatus(fileId: string, status: CsvFile['status']) {
    const supabase = createClient();
    const { error } = await supabase
        .from('csv_files')
        .update({ status })
        .eq('id', fileId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/files');
    revalidatePath('/store');
    revalidatePath('/');
    return { error: null };
}
