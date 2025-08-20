import { UploadForm } from "@/components/admin/upload-form";

export default function UploadPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Upload New File</h1>
        </div>
      <UploadForm />
    </main>
  );
}
