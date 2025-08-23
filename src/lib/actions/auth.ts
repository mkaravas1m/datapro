
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
        message: error.message || "Something went wrong."
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    if (error.message.includes('User already registered')) {
        return { message: "This email address is already in use. Please log in." };
    }
    console.error('Signup Error:', error);
    return {
        message: "An error occurred during signup. Please try again."
    }
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: data.user.id, full_name: name, email: email, balance: 100 });
    
    if (profileError) {
      console.error('Profile Creation Error:', profileError);
      // Even if profile creation fails, we might still proceed or handle it differently.
      // For now, we'll log it and let the user log in. The core user exists.
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
