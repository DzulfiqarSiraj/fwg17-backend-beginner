const db = require('../lib/db.lib')

// exports.findAll = async (keyword='', searchBy='ILIKE', sortBy, order) => {
//   const visibleColumn = ['id','basePrice','name','createdAt']
//   const allowOrder = ['asc','desc']
//   sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
//   searchBy = visibleColumn.includes(searchBy) ? searchBy : 'name'
//   order = allowOrder.includes(order) ? order : 'asc'

//   const sql = `
//   SELECT "id","name","basePrice","description","image","createdAt" 
//   FROM "products"
//   WHERE ${basePrice} ${searchBy == 'basePrice' ? '>':searchBy} $1 ORDER BY ${sortBy} ${order}
//   `
//   const values = [searchBy == 'basePrice' ? keyword : `%${keyword}%`]
//   const {rows} = await db.query(sql, values)
//   return rows
// };

// exports.findAll = async (keyword='', sortBy, order, page=1) => {
//   const visibleColumn = ['id','basePrice','name','createdAt']
//   const allowOrder = ['asc','desc']
//   sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
//   order = allowOrder.includes(order) ? order : 'asc'
//   const limit = 5
//   const offset = (page-1) * limit

//   const sql = `
//   SELECT "id","name","basePrice","description","image","createdAt" 
//   FROM "products"
//   WHERE "name" ILIKE $1 ORDER BY ${sortBy} ${order}
//   LIMIT ${limit} OFFSET ${offset}
//   `
//   const values = [`%${keyword}%`]
//   const {rows} = await db.query(sql, values)
//   return rows
// };

// exports.findAll = async (keyword='', sortBy, order) => {
//   const visibleColumn = ['id','basePrice','name','createdAt']
//   const allowOrder = ['asc','desc']
//   sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
//   order = allowOrder.includes(order) ? order : 'asc'

//   const sql = `
//   SELECT "id","name","basePrice","description","image","createdAt" 
//   FROM "products"
//   WHERE "basePrice" > $1 
//   ORDER BY ${sortBy} ${order}
//   `
//   const values = [keyword]
//   const {rows} = await db.query(sql, values)
//   return rows
// };

exports.findAll = async (keyword='', sortBy, order) => {
  const visibleColumn = ['id','basePrice','name','createdAt']
  const allowOrder = ['asc','desc']
  sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
  order = allowOrder.includes(order) ? order : 'asc'

  const sql = `
  SELECT "p"."id","p"."name" "name","c"."name" "category","p"."basePrice"
  FROM "products" "p"
  JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  WHERE "c"."name" LIKE $1
  ORDER BY "c"."${sortBy}" ${order}`

  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows
};

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
  SET ${column.join(', ')}
  WHERE "id"=$1
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}


exports.delete = async (id) => {
  const sql = `
  DELETE FROM "products"
  WHERE "id"=$1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}