import { getProduct } from "@/server/db/queries";

export default async function FullPageProductView(props: { id: number }) {
  const product = await getProduct(props.id);
  return <img src={product.image} className="w-96" />;
}
