
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
        message: error.message || "Something went wrong during login."
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

export async function signup(prevState: any, formData: FormData) {
    const supabaseAdmin = createAdminClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    
    // Step 1: Sign up the user
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError || !authData.user) {
      console.error("Auth Error:", authError);
      return {
        message: authError?.message || "An error occurred during signup. Please try again.",
      }
    }

    const { user } = authData;

    // Step 2: Create a profile for the new user. This is now redundant if the trigger works,
    // but we include it for robustness in case the trigger isn't active.
    // We use `upsert` to avoid errors if the trigger has already created the profile.
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({ 
        id: user.id, 
        full_name: fullName, 
        email: email, 
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error("Profile Error:", profileError);
       // We'll still try to log the user in, but the profile might be incomplete.
       // In a production app, you might want to delete the user or handle this differently.
    }

    // Step 3: Log the user in by signing in again to create a session
    const supabase = createClient();
     const { error: sessionError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (sessionError) {
       return {
        message: "Signup successful, but login failed. Please go to the login page."
      }
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}
