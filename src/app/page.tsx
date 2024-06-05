import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/schema";
import ProductList from "./_components/productList";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <ProductList />
    </main>
  );
}
