const db = require('../lib/db.lib')

exports.selectAll = async (page = 1, limit) => {
  const offset = (page - 1) * limit
  const sql = `SELECT
  "ps"."id",
  "ps"."productId",
  "ps"."sizeId",
  CONCAT("p"."name", ' - ', "s"."name") "productSize",
  "ps"."createdAt",
  "ps"."updatedAt"
  FROM "productSizes" "ps"
  JOIN "products" "p" ON "p"."id"="ps"."productId"
  JOIN "sizes" "s" ON "s"."id"="ps"."sizeId"
  GROUP BY "p"."id","s"."id","ps"."id"
  ORDER BY "ps"."id" ASC
  LIMIT ${limit}
  OFFSET ${offset}`
  const values = []
  const { rows } = await db.query(sql, values)
  return rows
}

exports.countAll = async () => {
  const sql = 'SELECT COUNT(*) as "counts" FROM "productSizes"'
  const values = []
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.selectOne = async (id) => {
  const sql = `SELECT
  "ps"."id",
  "ps"."productId",
  "ps"."sizeId",
  CONCAT("p"."name", ' - ', "s"."name") "productSize",
  "ps"."createdAt",
  "ps"."updatedAt"
  FROM "productSizes" "ps"
  JOIN "products" "p" ON "p"."id"="ps"."productId"
  JOIN "sizes" "s" ON "s"."id"="ps"."sizeId"
  WHERE "ps"."id" = $1
  GROUP BY "p"."id","s"."id","ps"."id"`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.selectOneByProductIdAndSizeId = async (productId, sizeId) => {
  const sql = `SELECT
  "ps"."id",
  "ps"."productId",
  "ps"."sizeId",
  CONCAT("p"."name", ' - ',"s"."name") "productSize",
  "ps"."createdAt",
  "ps"."updatedAt"
  FROM "productSizes" "ps"
  JOIN "products" "p" ON "p"."id"="ps"."productId"
  JOIN "sizes" "s" ON "s"."id"="ps"."sizeId"
  WHERE "ps"."productId" = $1 AND "ps"."sizeId" = $2
  GROUP BY "p"."id","s"."id","ps"."id"`
  const values = [productId, sizeId]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `INSERT INTO "productSizes"("productId","sizeId") VALUES
  ($1,$2)
  RETURNING *`
  const values = [data.productId, data.sizeId]
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

  const sql = `UPDATE "productSizes" SET
  ${column.join(', ')},
  "updatedAt" = NOW()
  WHERE "id" = $1
  RETURNING *`
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `DELETE FROM "productSizes"
  WHERE "id" = $1
  RETURNING *`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}
