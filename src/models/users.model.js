const db = require('../lib/db.lib')

exports.findAll = async () => {
  const sql = `SELECT *
  FROM "users"
  ORDER BY "id" ASC
  `
  const values = []
  const {rows} = await db.query(sql, values)
  return rows
}

exports.findOne = async (id) => {
  const sql = `
  SELECT "id","fullName","email","address","role","pictures","createdAt","updatedAt"
  FROM "users"
  WHERE "id" = $1`
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.findOneByEmail = async (email) => {
  const sql = `
  SELECT "id","fullName","password","email","address","role","createdAt","updatedAt"
  FROM "users"
  WHERE "email" = $1`
  const values = [email]
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "users"
  ("fullName","email","password","address","phoneNumber","role","pictures")
  VALUES
  ($1,$2,$3,$4,$5,$6,$7)
  RETURNING *
  `
  const values = [data.fullName,data.email,data.password,data.address,data.phoneNumber,data.role,data.pictures]
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
  UPDATE "users"
  SET ${column.join(', ')}, "updatedAt" = now()
  WHERE "id"=$1 
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `
  DELETE FROM "users"
  WHERE "id" = $1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}