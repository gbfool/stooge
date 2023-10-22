"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import DropZone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Progress } from "./ui/progress";
const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);
    return interval;
  };

  return (
    <DropZone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        // handle file upload
        await new Promise((resolve) => setTimeout(resolve, 1500));
        clearInterval(progressInterval);
        setIsUploading(false);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <input {...getInputProps()} />
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-6 w-6 mb-2 text-zinc-500" />
                <p className="mb-2 text-zinc-700 text-sm">
                  <span className="font-semibold">Click here to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-zinc-500">PDF (Upto 16 MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs flex items-center bg-white rounded-md outline outline-1 outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="max-w-xs m-auto mt-4 w-full">
                  <Progress
                    value={uploadProgress}
                    className="w-full h-1 bg-zinc-200"
                  />
                </div>
              ) : null}
            </label>
          </div>
        </div>
      )}
    </DropZone>
  );
};
const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
