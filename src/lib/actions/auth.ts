
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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
  // Use the admin client for user creation to bypass RLS for profile insertion
  const supabase = createAdminClient();

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
      // This is a critical error, but we'll return a generic message to the user.
      // In a production app, you might want to delete the auth user or flag for manual review.
      return {
        message: "An error occurred during signup. Please try again."
      }
    }
  } else {
    // This case should ideally not be reached if signup was successful without an error
    return {
        message: "An unknown error occurred during signup. Please try again."
    }
  }

  // After successful signup and profile creation, revalidate and redirect.
  // We need to use the regular server client to set the session for the user.
  const supabaseServer = createClient();
  const { error: sessionError } = await supabaseServer.auth.signInWithPassword({ email, password });
  
  if (sessionError) {
    // This is unlikely but possible. Redirect to login as a fallback.
    redirect("/login?message=Signup successful, please log in.");
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
