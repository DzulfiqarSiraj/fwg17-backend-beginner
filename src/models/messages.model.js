const db = require('../lib/db.lib')

exports.selectAll = async (page = 1, limit) => {
  const offset = (page - 1) * limit
  const sql = `SELECT * FROM "messages"
  ORDER BY "senderId" ASC
  LIMIT ${limit}
  OFFSET ${offset}`
  const values = []
  const { rows } = await db.query(sql, values)
  return rows
}

exports.countAll = async () => {
  const sql = 'SELECT COUNT(*) as "counts" FROM "messages"'
  const values = []
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.selectOne = async (id) => {
  const sql = `SELECT * FROM "messages"
  WHERE "id" = $1`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.insert = async (data) => {
  const sql = `INSERT INTO "messages" ("recipientId","senderId","text") VALUES
  ($1,$2,$3) RETURNING *`
  const values = [data.recipientId, data.senderId, data.text]
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

  const sql = `UPDATE "messages" SET
  ${column.join(', ')},
  "updatedAt" = NOW()
  WHERE "id" = $1
  RETURNING *`
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = `DELETE FROM "messages"
  WHERE "id" = $1
  RETURNING *`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}
