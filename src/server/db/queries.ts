import "server-only";
import { db } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { products } from "./schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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

export async function deleteProduct(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.userId, user.userId)));

  redirect("/");
}

export async function updateProduct(
  id: number,
  newTitle: string,
  newDescription: string
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .update(products)
    .set({
      title: newTitle,
      description: newDescription,
    })
    .where(and(eq(products.id, id), eq(products.userId, user.userId)));

  redirect("/");
}
