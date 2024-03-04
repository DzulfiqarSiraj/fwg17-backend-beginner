const db = require('../lib/db.lib')

exports.findAll = async (keyword='', page=1, limit) => {
  const offset = (page-1) * limit
  const sql = `
  SELECT "p"."id", "p"."name", "c"."name" "category", "p"."basePrice", "p"."image", "p"."description","p"."discount", "p"."isBestSeller", "p"."createdAt","p"."updatedAt"
  FROM "products" "p"
  LEFT JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  LEFT JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "p"."name" ILIKE $1
  LIMIT ${limit} OFFSET ${offset}
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findCombine = async (id) => {
  const sql = `
  SELECT
  "p"."id",
  "p"."name",
  "p"."description",
  "p"."basePrice",
  "p"."image",
  (
    SELECT jsonb_build_object(
      'id', "ps"."id",
      'size', "ps"."size",
      'additionalPrice', "ps"."additionalPrice"
    )
  ) as "sizes",
  (
    SELECT jsonb_build_object(
      'id', "pv"."id",
      'variant', "pv"."name",
      'additionalPrice', "pv"."additionalPrice"
    )
  ) as "variants",
  "p"."discount",
  "p"."isBestSeller",
  "p"."createdAt",
  "p"."updatedAt"
  FROM "products" "p"
  LEFT JOIN "productVariant" "pv" ON "pv"."productId" = "p"."id"
  LEFT JOIN "productSize" "ps" ON "ps"."productId" = "p"."id"
  WHERE "p"."id" = $1
  GROUP BY "p"."id", "ps"."productId", "ps"."id", "pv"."productId", "pv"."id"
  `

  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows
}

exports.findOne = async (id) => {
  const sql = `
  SELECT *
  FROM "products"
  WHERE "id" = $1
  `
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
};

exports.countAll = async (keyword='')=>{
  const sql = `
  SELECT COUNT("p"."id") as "counts"
  FROM "products" "p"
  LEFT JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  LEFT JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "p"."name" ILIKE $1
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows[0].counts
}

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "products" 
  ("name","description","basePrice","image","discount","isBestSeller")
  VALUES
  ($1,$2,$3,$4,$5,$6)
  RETURNING *
  `
  const values = [data.name, data.description, data.basePrice, data.image, data.discount, data.isBestSeller]
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.update = async (id, data) => {
  const column = []
  const values = []

  values.push(id)
  for(let item in data){
    values.push(data[item])
    column.push(`"${item}"=$${values.length}`)
  }
  const sql = `
  UPDATE "products"
  SET ${column.join(', ')}, "updatedAt" = now()
  WHERE "id"=$1
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `
  DELETE FROM "products"
  WHERE "id" = $1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}