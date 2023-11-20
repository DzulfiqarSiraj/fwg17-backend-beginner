const db = require('../lib/db.lib')


exports.findAll = async () => {
  const sql = `SELECT * FROM "messages"`
  const values = []
  const {rows} = await db.query(sql, values)
  return rows
};

exports.findOne = async (id) => {
  const sql = `
  SELECT *
  FROM "messages"
  WHERE "id" = $1
  `
  const values = [id]
  const {rows} = await db.query(sql, values)
  return rows[0]
};

exports.insert = async (data) => {
  const sql = `
  INSERT INTO "messages" 
  ("recipientId","senderId","text")
  VALUES
  ($1,$2,$3)
  RETURNING *
  `
  const values = [data.recipientId, data.senderId, data.text]
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
  UPDATE "messages"
  SET ${column.join(', ')}
  WHERE "id"=$1
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}


exports.delete = async (id) => {
  const sql = `
  DELETE FROM "messages"
  WHERE "id"=$1
  RETURNING *
  `
  const values = [id];
  const {rows} = await db.query(sql, values);
  return rows[0]
}