import { Modal } from "./modal";
import FullPageProductView from "@/components/full-image-page";

export default function ProductModal({
  params: { id: productId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(productId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid product id");

  return (
    <Modal>
      <FullPageProductView id={idAsNumber} />
    </Modal>
  );
}
