const db = require('../lib/db.lib')

exports.selectAll = async (keyword = '', page = 1, limit) => {
  const offset = (page - 1) * limit
  const sql = `SELECT
  "id",
  "fullName",
  "email",
  "address",
  "phoneNumber",
  "role",
  "pictures",
  "createdAt",
  "updatedAt"
  FROM "users"
  WHERE "fullName" ILIKE $1
  ORDER BY "id" ASC
  LIMIT ${limit}
  OFFSET ${offset}`
  const values = [`%${keyword}%`]
  const { rows } = await db.query(sql, values)
  return rows
}

exports.countAll = async (keyword = '') => {
  const sql = `SELECT COUNT(*) as "counts" FROM "users"
  WHERE "fullName" ILIKE $1`
  const values = [`%${keyword}%`]
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.selectOne = async (id) => {
  const sql = `SELECT
  "id",
  "fullName",
  "email",
  "address",
  "phoneNumber",
  "role",
  "pictures",
  "createdAt",
  "updatedAt"
  FROM "users"
  WHERE "id" = $1`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.selectOneByEmail = async (email) => {
  const sql = `SELECT * FROM "users" 
  WHERE "email" = $1`
  const values = [email]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `INSERT INTO "users"("fullName","email","password","address","phoneNumber","role","pictures") VALUES
  ($1,$2,$3,$4,$5,$6,$7)
  RETURNING *`
  const values = [data.fullName, data.email, data.password, data.address, data.phoneNumber, data.role, data.pictures]
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

  const sql = `UPDATE "users" SET
  ${column.join(', ')},
  "updatedAt" = NOW()
  WHERE "id" = $1
  RETURNING *`
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `DELETE FROM "users" 
  WHERE "id" = $1
  RETURNING *`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}
