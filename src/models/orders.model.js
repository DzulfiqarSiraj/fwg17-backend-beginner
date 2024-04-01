const db = require('../lib/db.lib')

exports.selectAll = async (search, page = 1, limit) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT 
		*
	FROM 
		"orders"
	${search ? `WHERE "status" = '${search}'` : ''}
	ORDER BY 
		"id" ASC
	LIMIT
		${limit} 
	OFFSET 
		${offset}
	`
	const values = []
	const {rows} = await db.query(sql, values)
	return rows
};

exports.selectAllByUserId = async (userId, search, page = 1, limit) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT 
		"id",
		"userId",
		"orderNumber",
		"email",
		"promoId",
		"tax",
		"grandTotal",
		"deliveryAddress",
		"status",
		to_char(date("createdAt"), 'YYYY-MM-DD') AS "date"
	FROM 
		"orders"
	WHERE 
		"userId" = $1
		${search ? `AND "status" = '${search}'` : ''}
	ORDER BY 
		"id" DESC
	LIMIT
		${limit} 
	OFFSET 
		${offset}
	`
	const values = [userId]
	const {rows} = await db.query(sql, values)
	return rows
};

exports.countAll = async (search) =>{
	const sql = 
	`
		SELECT 
			COUNT(*) as "counts"
		FROM 
			"orders"
		${search ? `WHERE "status" = '${search}'` : ''}
	`
	const values = []
	const {rows} = await db.query(sql, values)
	return rows[0].counts
};

exports.countAllByUserId = async (userId, search) =>{
	const sql = 
	`
		SELECT 
			COUNT(*) as "counts"
		FROM 
			"orders"
		WHERE 
			"userId" = $1
			${search ? `AND "status" = '${search}'` : ''}
	`
	const values = [userId]
	const {rows} = await db.query(sql, values)
	return rows[0].counts
};

exports.selectOne = async (id) => {
	const sql = 
	`
	SELECT 
		*
	FROM 
		"orders"
	WHERE 
		"id" = $1
	`
	const values = [id]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.selectIdByOrderNum = async (orderNumber) => {
	const sql = 
	`
	SELECT 
		"id"
	FROM 
		"orders"
	WHERE 
		"orderNumber" = $1
	`
	const values = [`${orderNumber}`]
	const {rows} = await db.query(sql, values)
	return rows[0]
}

exports.insert = async (data) => {
	const sql = 
	`
	INSERT INTO 
		"orders"
		("userId","orderNumber","fullName","email","promoId","tax","grandTotal","deliveryAddress","status","shipping")
	VALUES
		($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
	RETURNING *
	`
	const values = [data.userId, data.orderNumber, data.fullName, data.email, data.promoId, data.tax, data.grandTotal, data.deliveryAddress, data.status, data.shipping]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.update = async (id, data) => {
	const column = []
	const values = []

	values.push(id)

	for(let item in data){
	if(data[item]){
		values.push(data[item])
		column.push(`"${item}"=$${values.length}`)
	}
	}

	const sql = 
	`
	UPDATE 
		"orders"
	SET 
		${column.join(', ')}, 
		"updatedAt" = NOW()
	WHERE 
		"id" = $1 
	RETURNING *
	`
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.delete = async (id) => {
	const sql = 
	`
		DELETE FROM 
			"orders"
		WHERE 
			"id" = $1
		RETURNING *
	`
	const values = [id];
	const {rows} = await db.query(sql, values);
	return rows[0]
};