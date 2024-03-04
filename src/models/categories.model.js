const db = require('../lib/db.lib')


exports.findAll = async (keyword='', page = 1, limit) => {
  const offset = (page-1) * limit
  const sql = `SELECT * FROM "categories"
  WHERE "name" ILIKE $1
  ORDER BY "id" ASC
  LIMIT ${limit} OFFSET ${offset}`

  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows
};

exports.countAll = async (keyword='') =>{
  const sql = `
  SELECT COUNT(*) as counts 
  FROM "categories"
  WHERE "name" ILIKE $1
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows[0].counts
}

exports.findOne = async (id) => {
  const sql = `
  SELECT *
  FROM "categories"
  WHERE "id" = $1
  `
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
};

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "categories" 
  ("name")
  VALUES
  ($1)
  RETURNING *
  `
  const values = [data.name]
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
  UPDATE "categories"
  SET ${column.join(', ')}
  WHERE "id"=$1
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}


exports.delete = async (id) => {
  const sql = `
  DELETE FROM "categories"
  WHERE "id"=$1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}