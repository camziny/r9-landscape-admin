"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { SimpleUploadButton } from "./simpleUploadButton";
import Link from "next/link";

export function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold bg-slate-900">
      <div>
        <Link href="/">Home</Link>
      </div>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Add product:</span>

            <SimpleUploadButton />
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
