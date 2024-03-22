const db = require('../lib/db.lib')

exports.selectAll = async (page = 1, limit) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT 
		*
	FROM 
		"productSizes"
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

exports.countAll = async () =>{
	const sql = 
	`
		SELECT 
			COUNT(*) as "counts"
		FROM 
			"productSizes"
	`
	const values = []
	const {rows} = await db.query(sql, values)
	return rows[0].counts
};

exports.selectOne = async (id) => {
	const sql = 
	`
	SELECT 
		*
	FROM 
		"productSizes"
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
		"productSizes"
		("productId","sizeId")
	VALUES
		($1,$2)
	RETURNING *
	`
	const values = [data.productId, data.sizeId]
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
		"productSizes"
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
			"productSizes"
		WHERE 
			"id" = $1
		RETURNING *
	`
	const values = [id];
	const {rows} = await db.query(sql, values);
	return rows[0]
};