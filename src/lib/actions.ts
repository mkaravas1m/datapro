
"use server";

import { generateCsvPreview } from "@/ai/flows/generate-csv-preview";
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
