exports.findAll = async (keyword='', searchBy, sortBy, order) => {
  const visibleColumn = ['id','basePrice','name','createdAt']
  const allowOrder = ['asc','desc']
  sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
  searchBy = visibleColumn.includes(searchBy) ? searchBy : 'name'
  order = allowOrder.includes(order) ? order : 'asc'

  const sql = `
  SELECT "id","name","basePrice","description","image","createdAt" 
  FROM "products"
  WHERE "name" ILIKE $1 ORDER BY ${sortBy} ${order}
  `
  const values = [`%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows
};

exports.findAll = async (keyword='', searchBy, sortBy, order) => {
  const visibleColumn = ['id','basePrice','name','createdAt']
  const allowOrder = ['asc','desc']
  sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
  searchBy = visibleColumn.includes(searchBy) ? searchBy : 'name'
  order = allowOrder.includes(order) ? order : 'asc'

  const sql = `
  SELECT "id","name","basePrice","description","image","createdAt" 
  FROM "products"
  WHERE ${searchBy} ${searchBy == 'basePrice' ? '>' : 'ILIKE'} $1 ORDER BY ${sortBy} ${order}
  `
  const values = [searchBy == 'basePrice' ? keyword : `%${keyword}%`]
  const {rows} = await db.query(sql, values)
  return rows
};