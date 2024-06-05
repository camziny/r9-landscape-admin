import "server-only";
import { db } from "./schema";

export async function getProducts() {
  const products = await db.query.products.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return products;
}
