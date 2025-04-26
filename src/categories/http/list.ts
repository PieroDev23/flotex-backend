import { Middleware } from "koa";
import db from "../../db";
import { categories } from "../../db/schema";



export default (async ({ response }) => {
  const cats = await db.select({
    id: categories.id,
    name: categories.name,
    imageUrl: categories.imageUrl,
  }).from(categories);

  response.body = cats

}) as Middleware