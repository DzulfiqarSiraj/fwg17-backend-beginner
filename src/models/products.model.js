const db = require('../lib/db.lib')


exports.findAll = async () => {
  const sql = `SELECT * FROM "products"`
  const values = []
  const {rows} = await db.query(sql, values)
  return rows
}