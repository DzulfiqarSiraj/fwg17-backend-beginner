const db = require('../lib/db.lib')

exports.selectAll = async (search, page = 1, limit) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT 
		*
	FROM 
		"orderDetails"
	WHERE
		"orderId" = $1
	ORDER BY 
		"id" ASC
	LIMIT
		${limit} 
	OFFSET 
		${offset}
	`
	const values = [search]
	const {rows} = await db.query(sql, values)
	return rows
};

exports.countAll = async (search) =>{
	const sql = 
	`
		SELECT 
			COUNT(*) as "counts"
		FROM 
			"orderDetails"
		WHERE
			"orderId" = $1
	`
	const values = [search]
	const {rows} = await db.query(sql, values)
	return rows[0].counts
};

exports.selectOne = async (id) => {
	const sql = 
	`
	SELECT 
		*
	FROM 
		"orderDetails"
	WHERE 
		"id" = $1
	`
	const values = [id]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.insert = async (data) => {
	const sql = 
	`
	INSERT INTO 
		"orderDetails"
		("userId","orderId","productId","productSizeId","productVariantId","quantity","subTotal")
	VALUES
		($1,$2,$3,$4,$5,$6,$7)
	RETURNING *
	`
	const values = [data.userId, data.orderId, data.productId, data.productSizeId, data.productVariantId, data.quantity, data.subTotal]
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
		"orderDetails"
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
			"orderDetails"
		WHERE 
			"id" = $1
		RETURNING *
	`
	const values = [id];
	const {rows} = await db.query(sql, values);
	return rows[0]
};