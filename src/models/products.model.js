const db = require('../lib/db.lib')


exports.findAll = async () => {
  const sql = `SELECT * FROM "products"`
  const values = []
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
