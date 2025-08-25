
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
    const supabase = createAdminClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    
    // Step 1: Sign up the user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error("Sign Up Error:", signUpError);
      return {
        message: "Could not authenticate user: " + signUpError.message,
      }
    }

    if (!user) {
       return {
        message: "Could not authenticate user. User object not returned.",
      }
    }

    // Step 2: Manually create the user's profile with admin client
    const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        email: email,
        full_name: fullName,
    });
    
    if (profileError) {
      console.error("Profile Creation Error:", profileError);
      // Optional: Delete the user if profile creation fails to avoid orphaned auth users
      await supabase.auth.admin.deleteUser(user.id);
      return {
        message: "Database error saving new user: " + profileError.message,
      }
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}
