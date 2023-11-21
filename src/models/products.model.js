const db = require('../lib/db.lib')

exports.findAll = async (keyword='', searchBy='', sortBy, order, range = 'equal') => {
  const myArr = ['id','basePrice','name','category','createdAt']
  let operator;
  let operation;
  const allowedSort = ['asc','desc']

  const column = myArr.includes(searchBy)? searchBy: ""

  if(column === 'basePrice'){
    operator = range === 'higher'? '>' : range ==='lower'? '<' : range === 'equal'? '=' : 'ILIKE'
    operation = `${operator} ${keyword}`
  } else {
    operator = "ILIKE"
    operation = `${operator} %${keyword}%`
  }

  if(order == 'category'){
    console.log(`
    SELECT "p"."name","c"."name"
    FROM "products" "p"
    JOIN "productCategories" "pc" ON "pc"."productId"="p"."id"
    JOIN "categories" "c" ON "c"."id"="pc"."categoryId"
    ORDER BY ${order === 'category'? `"c"."name"` : `"p"."${order}"`} ${allowedSort.includes(sortBy)? sortBy:''}`)
  } else {
    console.log(`
    SELECT * FROM "products" WHERE "${column}" ${operation} ORDER BY "${order}" ${allowedSort.includes(sortBy)? sortBy:''}`)
  }
  const values = [searchBy == 'basePrice' ? keyword : `%${keyword}%`]
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