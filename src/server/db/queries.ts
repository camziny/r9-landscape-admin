import "server-only";
import { db } from "./schema";

export async function getProducts() {
  const products = await db.query.products.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return products;
}

export async function getProduct(id: number) {
  const product = await db.query.products.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!product) throw new Error("Image not found");

  return product;
}
