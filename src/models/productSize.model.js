const db = require('../lib/db.lib')

exports.findAll = async () => {
  const sql = `
  SELECT * FROM "productSize"
  `
  const values = []
  const {rows} = await db.query(sql, values)
  return rows
}

exports.findOne = async (id) => {
  const sql = `
  SELECT *
  FROM "productSize"
  WHERE "id"=$1
  `
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "productSize" ("size", "additionalPrice")
  VALUES
  ($1,$2)
  RETURNING *
  `
  const values = [data.size, data.additionalPrice]
  const {rows} = await db.query(sql, values)
  return rows[0]
}

const update = async (id, data) => {
  const column = []
  const values = []

  values.push(id)
  for(let item in data){
    values.push(data[item])
    column.push(`"${item}"=$${values.length}`)
  }

  const sql = `
  UPDATE "productSize"
  SET ${column.join(', ')}
  WHERE "id"=$1
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `
  DELETE FROM "productSize"
  WHERE "id"=$1
  RETURNING *
  `
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
}