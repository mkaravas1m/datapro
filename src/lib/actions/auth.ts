
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "../supabase/admin";

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
  
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        email: email
      },
    },
  });

  if (signUpError) {
    if (signUpError.message.includes('User already registered')) {
        return { message: "This email address is already in use. Please log in." };
    }
    console.error('Signup Error:', signUpError);
    return {
        message: "An error occurred during signup. Please try again."
    }
  }

  if (!user) {
    return {
      message: "User was not created. Please try again."
    }
  }

  // Manually create the user profile in the public.profiles table
  const supabaseAdmin = createAdminClient();
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: user.id,
      full_name: name,
      email: email,
      balance: 0,
      role: 'Client'
    });

  if (profileError) {
    console.error('Error creating profile:', profileError);
    // Note: In a production app, you might want to delete the auth user as well
    // to keep the database consistent.
    return {
      message: "Database error saving new user. Please try again."
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
