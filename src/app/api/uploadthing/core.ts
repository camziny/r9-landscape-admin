import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db, products } from "../../../server/db/schema";

// import { ratelimit } from "../../../server";

const f = createUploadthing();

async function updateUserUploadPermission(userId: string) {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        "can-upload": true,
      },
    });
    console.log(`Updated upload permissions for user ID: ${userId}`);
  } catch (error: any) {
    console.error(`Error updating user permissions: ${error.message}`);
  }
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");
      await updateUserUploadPermission(user.userId);
      const fullUserData = await clerkClient.users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User Does Not Have Upload Permissions");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(products).values({
        title: "Product Name",
        description: "Product Description",
        image: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
