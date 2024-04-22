const db = require('../lib/db.lib')

exports.selectAll = async (search, page = 1, limit) => {
  const offset = (page - 1) * limit
  const sql = `SELECT
  "od"."id" "id",
  "o"."id" "orderId",
  "o"."userId" "userId",
  "o"."orderNumber" "orderNumber",
  "o"."fullName" "fullName",
  "o"."email" "email",
  "o"."promoId" "promoId",
  "o"."tax" "tax",
  "o"."grandTotal" "grandTotal",
  "o"."deliveryAddress" "deliveryAddress",
  "o"."status" "status",
  "od"."productId" "productId",
  "p"."name" "product",
  "p"."image" "image",
  "od"."productSizeId" "productSizeId",
  "s"."name" "size",
  "od"."productVariantId" "productVariantId",
  "v"."name" "variant",
  "od"."quantity" "quantity",
  "t"."name" "tag",
  "t"."discount",
  "od"."subTotal" "subTotal",
  "o"."shipping" "shipping",
  to_char(date("o"."createdAt"), 'YYYY-MM-DD') AS "date",
  to_char("o"."createdAt", 'HH12:MI AM') AS "time",
  "od"."createdAt",
  "od"."updatedAt"
  FROM "orderDetails" "od"
  JOIN "orders" "o" ON "o"."id"="od"."orderId"
  JOIN "products" "p" ON "p"."id"="od"."productId"
  JOIN "sizes" "s" ON "s"."id"="od"."productSizeId"
  JOIN "variants" "v" ON "v"."id"="od"."productVariantId"
  FULL JOIN "productTags" "pt" ON "pt"."productId"="p"."id"
  FULL JOIN "tags" "t" ON "t"."id"="pt"."tagId"
  WHERE "orderId" = $1
  ORDER BY "id" ASC
  LIMIT ${limit}
  OFFSET ${offset}`
  const values = [search]
  const { rows } = await db.query(sql, values)
  return rows
}

exports.countAll = async (search) => {
  const sql = `SELECT COUNT(*) as "counts" FROM "orderDetails"
  WHERE "orderId" = $1`
  const values = [search]
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.selectOne = async (id) => {
  const sql = `SELECT * FROM "orderDetails"
  WHERE "id" = $1`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `INSERT INTO "orderDetails"("userId","orderId","productId","productSizeId","productVariantId","quantity","subTotal") VALUES
  ($1,$2,$3,$4,$5,$6,$7)
  RETURNING *`
  const values = [data.userId, data.orderId, data.productId, data.productSizeId, data.productVariantId, data.quantity, data.subTotal]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.update = async (id, data) => {
  const column = []
  const values = []

  values.push(id)

  for (const item in data) {
    if (data[item]) {
      values.push(data[item])
      column.push(`"${item}"=$${values.length}`)
    }
  }

  const sql = `UPDATE "orderDetails" SET
  ${column.join(', ')},
  "updatedAt" = NOW()
  WHERE "id" = $1
  RETURNING *`
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `DELETE FROM "orderDetails"
  WHERE "id" = $1
  RETURNING *`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}
