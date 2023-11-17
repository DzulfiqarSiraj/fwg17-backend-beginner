const db = require('../lib/db.lib')

exports.findAll = async () => {
  const sql = `SELECT * FROM "users"`
  const values = []
  const {rows} = await db.query(sql, values)
  return rows
}

exports.findOne = async (id) => {
  const sql = `SELECT * FROM "users" WHERE id = $1`
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "users"
  ("username","email","password","address","phoneNumber","role","pictures")
  VALUES
  ($1,$2,$3,$4,$5,$6,$7)
  RETURNING *
  `
  const values = [data.username,data.email,data.password,data.address,data.phoneNumber,data.role,data.pictures]
  const {rows} = await db.query(sql, values)
  return rows[0]
}