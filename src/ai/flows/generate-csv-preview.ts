'use server';

/**
 * @fileOverview Generates a sample preview of CSV data using AI.
 *
 * - generateCsvPreview - A function that generates a sample preview of CSV data.
 * - GenerateCsvPreviewInput - The input type for the generateCsvPreview function.
 * - GenerateCsvPreviewOutput - The return type for the generateCsvPreview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCsvPreviewInputSchema = z.object({
  csvDataUri: z
    .string()
    .describe(
      "The CSV data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  metadata: z.string().describe('The metadata of the CSV file, including name, description, and category.'),
});
export type GenerateCsvPreviewInput = z.infer<typeof GenerateCsvPreviewInputSchema>;

const GenerateCsvPreviewOutputSchema = z.object({
  preview: z.string().describe('A sample preview of the CSV data.'),
});
export type GenerateCsvPreviewOutput = z.infer<typeof GenerateCsvPreviewOutputSchema>;

export async function generateCsvPreview(input: GenerateCsvPreviewInput): Promise<GenerateCsvPreviewOutput> {
  return generateCsvPreviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCsvPreviewPrompt',
  input: {schema: GenerateCsvPreviewInputSchema},
  output: {schema: GenerateCsvPreviewOutputSchema},
  prompt: `You are an expert data analyst specializing in generating previews of CSV data.

You will use the following information to create a concise and informative preview of the CSV data.

Metadata: {{{metadata}}}
CSV Data: {{csvDataUri}}.

Based on the metadata and CSV data provided, generate a sample preview that includes the first few rows and a summary of the data structure.  The preview should be formatted for easy readability.
`,
});

const generateCsvPreviewFlow = ai.defineFlow(
  {
    name: 'generateCsvPreviewFlow',
    inputSchema: GenerateCsvPreviewInputSchema,
    outputSchema: GenerateCsvPreviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
