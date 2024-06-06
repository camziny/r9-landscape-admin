import { deleteProduct, getProduct, updateProduct } from "@/server/db/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "./ui/button";

export default async function FullPageProductView(props: { id: number }) {
  const product = await getProduct(props.id);
  const uploaderInfo = await clerkClient.users.getUser(product.userId);
  const idAsNumber = Number(props.id);

  return (
    <div className="flex w-full h-full bg-gray-900 p-6 border border-gray-700 rounded-md shadow-lg">
      <div className="flex-shrink-0 flex justify-center items-center w-1/2 p-4">
        <img
          src={product.image}
          className="object-contain max-h-full max-w-full rounded-md"
        />
      </div>
      <div className="flex-grow flex flex-col justify-center text-gray-200 border-l border-gray-700 p-6 space-y-4">
        <form
          action={async (formData) => {
            "use server";
            const title = formData.get("title");
            const description = formData.get("description");
            if (typeof title !== "string" || typeof description !== "string") {
              throw new Error("Invalid form data");
            }
            await updateProduct(product.id, title, description);
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={product.title}
              placeholder="Enter new title"
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.description}
              placeholder="Enter new description"
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Update Product
          </button>
        </form>
        <div className="text-md space-y-2">
          <div>
            <span className="block font-medium">Added by:</span>
            <span className="font-light"> {uploaderInfo.fullName}</span>
          </div>
          <div>
            <span className="block font-medium">Created on:</span>
            <span className="font-light">
              {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div>
          <form
            action={async () => {
              "use server";
              await deleteProduct(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
