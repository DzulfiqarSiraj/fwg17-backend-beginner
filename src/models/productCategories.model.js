const db = require('../lib/db.lib')

exports.selectAll = async (page = 1, limit) => {
  const offset = (page - 1) * limit
  const sql = `SELECT
  "pc"."id",
  "pc"."productId",
  "pc"."categoryId",
  CONCAT("p"."name", ' - ', "c"."name") "productCategory",
  "pc"."createdAt",
  "pc"."updatedAt"
  FROM "productCategories" "pc"
  JOIN "products" "p" ON "p"."id"="pc"."productId"
  JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  GROUP BY "p"."id","c"."id","pc"."id"
  ORDER BY "pc"."id" ASC
  LIMIT ${limit}
  OFFSET ${offset}`
  const values = []
  const { rows } = await db.query(sql, values)
  return rows
}

exports.countAll = async () => {
  const sql = 'SELECT COUNT(*) as "counts" FROM "productCategories"'
  const values = []
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.selectOne = async (id) => {
  const sql = `SELECT
  "pc"."id",
  "pc"."productId",
  "pc"."categoryId",
  CONCAT("p"."name", ' - ',"c"."name") "productCategory",
  "pc"."createdAt",
  "pc"."updatedAt"
  FROM "productCategories" "pc"
  JOIN "products" "p" ON "p"."id"="pc"."productId"
  JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "pc"."id" = $1
  GROUP BY "p"."id","c"."id","pc"."id"`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.selectOneByProductIdAndCategoryId = async (productId, categoryId) => {
  const sql = `SELECT
  "pc"."id",
  "pc"."productId",
  "pc"."categoryId",
  CONCAT("p"."name", ' - ',"c"."name") "productCategory",
  "pc"."createdAt",
  "pc"."updatedAt"
  FROM "productCategories" "pc"
  JOIN "products" "p" ON "p"."id"="pc"."productId"
  JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "pc"."productId" = $1 AND "pc"."categoryId" = $2
  GROUP BY "p"."id","c"."id","pc"."id"`
  const values = [productId, categoryId]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `INSERT INTO "productCategories" ("productId","categoryId") VALUES
  ($1,$2)
  RETURNING *`
  const values = [data.productId, data.categoryId]
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

  const sql = `UPDATE "productCategories" SET
  ${column.join(', ')},
  "updatedAt" = NOW()
  WHERE "id" = $1 RETURNING *`
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `DELETE FROM "productCategories"
  WHERE "id" = $1 RETURNING *`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}
