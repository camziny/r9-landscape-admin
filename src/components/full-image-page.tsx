import { getProduct } from "@/server/db/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPageProductView(props: { id: number }) {
  const product = await getProduct(props.id);
  const uploaderInfo = await clerkClient.users.getUser(product.userId);
  return (
    <div className="flex w-full h-full bg-black p-6 border border-white">
      <div className="flex-shrink-0 flex justify-center items-center w-1/2">
        <img
          src={product.image}
          className="object-contain max-h-full max-w-full"
        />
      </div>
      <div className="flex-grow flex flex-col justify-center text-gray-200 border-l border-gray-300 p-6">
        <div className="text-2xl font-semibold mb-4">{product.title}</div>
        <div className="text-lg">{product.description}</div>
        <div className="text-md flex flex-col">
          Added by:
          <span className="font-light"> {uploaderInfo.fullName}</span>
        </div>
        <div className="text-md flex flex-col">
          Created on:
          <span className="font-light">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
