const db = require('../lib/db.lib')

exports.findAll = async (keyword='',filterBy='name',sortBy='id',order='asc',page=1, limit, bestSeller) => {
  const offset = (page-1) * limit
  const sql = `
  SELECT "p"."id", "p"."name", "c"."name" "category", "p"."basePrice", "p"."image", "p"."description","p"."discount", "p"."isBestSeller", "p"."createdAt","p"."updatedAt"
  FROM "products" "p"
  LEFT JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  LEFT JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE ${filterBy == 'category'? `"c"."name"` : `"p"."${filterBy}"`} ILIKE $1 ${bestSeller? `AND "p"."isBestSeller" = ${bestSeller} `: '' }
  ORDER BY ${sortBy == 'category' ? `"c"."name"` : `"p"."${sortBy}"`} ${order}
  LIMIT ${limit} OFFSET ${offset}
  `
//  NEW QUERY
//  `
//   SELECT "p".*
//   FROM "products" "p"
//   JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
//   JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
//   WHERE "p"."name" ILIKE $1 
//   ${category && `AND "c"."name" IN (${category.map(data => `'${data}'`).join(',')})`} 
//   ${basePrice && 'AND "p"."basePrice" BETWEEN 0 AND 60000'}
//   ${category && `GROUP BY "p"."id", "p"."name" 
//   HAVING COUNT(DISTINCT "c"."name") = ${category.length}`}
//   LIMIT ${limit} OFFSET ${offset}
//   `

  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql,values)
  return rows
}

exports.findAllByIdOrBasePrice = async (keyword='0',filterBy='basePrice', range='higher',sortBy='name',order='asc',page=1) => {
  const limit = 5
  const offset = (page-1) * limit
  const allowedRange = {
    higher: '>',
    lower: '<',
    equal: '='
  }
  const sql = `
  SELECT "p"."id", "p"."name", "c"."name" "category", "p"."basePrice", "p"."image", "p"."description", "p"."createdAt","p"."updatedAt"
  FROM "products" "p"
  LEFT JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  LEFT JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "p"."${filterBy}" ${allowedRange[range]} $1
  ORDER BY ${sortBy === 'category'? `"c"."name"` : `"p"."${sortBy}"`} ${order}
  LIMIT ${limit} OFFSET ${offset}
  `
  const values = [keyword]
  console.log(values)
  console.log(sql)
  const {rows} = await db.query(sql, values)
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

exports.countAll = async (keyword='',filterBy='name',bestSeller)=>{
  const sql = `
  SELECT COUNT("p"."id") as "counts"
  FROM "products" "p"
  LEFT JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  LEFT JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE ${filterBy == 'category'? `"c"."name"` : `"p"."${filterBy}"`} ILIKE $1 ${bestSeller? `AND "p"."isBestSeller" = ${bestSeller} `: '' }
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows[0].counts
}

exports.countAllbyBasePrice = async (keyword='',range='higher')=>{
  const allowedRange = {
    higher: '>',
    lower: '<',
    equal: '='
  }
  const sql = `
  SELECT COUNT("p"."id") as "counts"
  FROM "products" "p"
  LEFT JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  LEFT JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "p"."basePrice" ${allowedRange[range]} $1
  `
  const values = [keyword]
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