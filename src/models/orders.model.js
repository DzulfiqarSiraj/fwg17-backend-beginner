const db = require('../lib/db.lib')


exports.findAll = async () => {
  const sql = `SELECT * FROM "orders"`
  const values = []
  const {rows} = await db.query(sql, values)
  return rows
};

exports.findOne = async (id) => {
  const sql = `
  SELECT *
  FROM "orders"
  WHERE "id" = $1
  `
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
};

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "orders" 
  ("userId","orderNumber","fullName","email","promoId","tax","total","deliveryAddress","status")
  VALUES
  ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  RETURNING *
  `
  const values = [data.userId, data.orderNumber, data.fullName, data.email, data.promoId, data.tax, data.total, data.deliveryAddress, data.status]
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
  UPDATE "orders"
  SET ${column.join(', ')}
  WHERE "id"=$1
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}


exports.delete = async (id) => {
  const sql = `
  DELETE FROM "orders"
  WHERE "id"=$1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}