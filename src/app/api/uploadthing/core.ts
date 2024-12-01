import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  customizedDesignPreviewUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ temp: z.literal(true).default(true) }))
    .middleware(async ({ input }) => {
      return input;
    })
    .onUploadComplete(async ({ file }) => {
      return file.url;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
