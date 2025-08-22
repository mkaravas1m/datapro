
"use server";

import { generateCsvPreview } from "@/ai/flows/generate-csv-preview";
import { signIn } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

const GeneratePreviewInputSchema = z.object({
  csvDataUri: z.string(),
  metadata: z.string(),
});

export async function generatePreviewAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = GeneratePreviewInputSchema.safeParse({
      csvDataUri: formData.get("csvDataUri"),
      metadata: formData.get("metadata"),
    });

    if (!validatedFields.success) {
      return {
        message: "Invalid input.",
        preview: "",
      };
    }
    
    const result = await generateCsvPreview(validatedFields.data);

    return {
      message: "Preview generated successfully.",
      preview: result.preview,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while generating the preview.",
      preview: "",
    };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", { email, password, redirect: true, redirectTo: "/dashboard" });
    
    return {
      message: "Logged in successfully."
    }

  } catch (error: any) {
    if (error.message.includes("CredentialsSignin")) {
      return { message: "Invalid email or password." };
    }
    return { message: "An unexpected error occurred. Please try again." };
  }
}

