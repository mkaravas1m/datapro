"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { generatePreviewAction } from "@/lib/actions";

const initialState = {
  message: "",
  preview: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Preview"
      )}
    </Button>
  );
}

export function UploadForm() {
  const [state, formAction] = useFormState(generatePreviewAction, initialState);
  const [fileSelected, setFileSelected] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dataUriRef = useRef<HTMLInputElement>(null);
  const metadataRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(true);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (dataUriRef.current) {
          dataUriRef.current.value = loadEvent.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFileSelected(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    
    if (metadataRef.current) {
        metadataRef.current.value = JSON.stringify({ name, description, category, price });
    }
    
    // Create a new FormData object to pass to the action
    const actionFormData = new FormData();
    actionFormData.append('csvDataUri', dataUriRef.current?.value || '');
    actionFormData.append('metadata', metadataRef.current?.value || '');

    formAction(actionFormData);
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="grid auto-rows-max items-start gap-4 md:col-span-2 lg:gap-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>File Details</CardTitle>
            <CardDescription>
              Provide metadata for the CSV file you are uploading.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full"
                  defaultValue="USA B2B Company Leads"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue="A comprehensive list of over 50,000 B2B companies..."
                  className="min-h-32"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" type="text" defaultValue="Business" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" defaultValue="499.99" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
            <CardDescription>
              Select the CSV file to upload from your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
             {/* Hidden fields for the action */}
            <input type="hidden" name="csvDataUri" ref={dataUriRef} />
            <input type="hidden" name="metadata" ref={metadataRef} />
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm" disabled={!fileSelected}>
            <Upload className="mr-2 h-4 w-4" /> Save Product
          </Button>
        </div>
      </form>
      
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Preview</CardTitle>
            <CardDescription>
              Generate a sample preview of your data for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex justify-center">
                 <SubmitButton />
              </div>
              {state.preview && (
                <div className="rounded-md border bg-muted p-4">
                    <h3 className="flex items-center font-semibold mb-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Data Preview
                    </h3>
                  <pre className="text-sm whitespace-pre-wrap font-mono bg-background p-2 rounded-sm max-h-96 overflow-auto">
                    {state.preview}
                  </pre>
                </div>
              )}
               {state.message && !state.preview && (
                  <p className="text-sm text-destructive">{state.message}</p>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
