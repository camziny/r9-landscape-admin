import { getProduct } from "@/server/db/queries";

export default async function FullPageProductView(props: { id: number }) {
  const product = await getProduct(props.id);
  return (
    <div className="flex w-full h-full min-w-0 bg-gray-100">
      <div className="flex-shrink flex justify-center items-center">
        <img src={product.image} className="object-contain" />
      </div>
      <div className="w-48 flex flex-col flex-shrink-0 text-gray-800 border-l">
        <div className="text-xl font-semibold">{product.title}</div>
        <div className="">{product.description}</div>
      </div>
    </div>
  );
}
