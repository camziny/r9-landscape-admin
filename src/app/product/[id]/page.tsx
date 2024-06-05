import FullPageProductView from "@/components/full-image-page";

export default function ProductPage({
  params: { id: productId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(productId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid product id");

  return <FullPageProductView id={idAsNumber} />;
}
