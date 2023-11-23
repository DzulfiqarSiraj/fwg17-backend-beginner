const db = require('../lib/db.lib')

exports.findAll = async (keyword='', searchBy='', sortBy='', order='', range = 'ILIKE') => {
  const allowedColumn = ['id','basePrice','name','category','createdAt']
  let operator;
  let operation;
  const allowedSort = ['asc','desc']
  let sql;

  const column = allowedColumn.includes(searchBy)? searchBy: ""

  if(column === 'basePrice'){
    operator = range === 'higher'? '>' : range ==='lower'? '<' : range === 'equal'? '=' : 'ILIKE'
    operation = `${operator} $1`
  } else {
    operator = "ILIKE"
    operation = `${operator} %$1%`
  }

  if(order == 'category'){
    sql = `
    SELECT "p"."id","p"."name" "name","c"."name" "category","p"."basePrice"
    FROM "products" "p"
    JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
    JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
    WHERE "p"."${column}" ${operation}
    ORDER BY ${order === 'category'? `"c"."name"` : `"p"."${order}"`} ${allowedSort.includes(sortBy)? sortBy:''}`
  } else {
    sql = `
    SELECT * FROM "products" WHERE "${column}" ${operation} ORDER BY "${order}" ${allowedSort.includes(sortBy)? sortBy:''}`
  }
  const values = [keyword]
  const {rows} = await db.query(sql, values)
  return rows
};

const findAll = async (keyword='',searchBy='',range='',orderBy='id',order) => {
  const columnSearch = searchBy === '' ? '' : searchBy === 'category'? `WHERE "c"."name"`:`WHERE "p"."${searchBy}"`
  const columnOrder = orderBy === 'category'? `ORDER BY "c"."name"`:`ORDER BY "p"."${orderBy}"`
  const allowedOrder = ['asc','desc']
  const allowedRange= 
  range == '' ? '' :
  searchBy == 'basePrice' && range === 'higher'? '>' :
  searchBy == 'basePrice' && range === 'lower'? '<' :
  searchBy == 'basePrice' && range === 'equal'? '=': 'ILIKE'

  const sql = `
  SELECT "p"."id", "p"."name" "name", "c"."name" "category", "p"."basePrice", "p"."createdAt", "p"."updatedAt"
  FROM "products" "p"
  JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
  JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
  ${columnSearch} ${allowedRange} $1
  ${columnOrder} ${allowedOrder.includes(order)? order: 'asc'}
  `
  const values = [searchBy === 'basePrice'? keyword : `%${keyword}%`]
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
  WHERE "id"=$1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}