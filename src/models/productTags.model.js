const db = require('../lib/db.lib')

exports.selectAll = async (page = 1, limit) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT 
		"pt"."id",
		"pt"."productId",
		"pt"."tagId",
		CONCAT("p"."name", ' - ', "t"."name") "productTag",
		"pt"."createdAt",
		"pt"."updatedAt"
	FROM 
		"productTags" "pt"
	JOIN 
		"products" "p" ON "p"."id"="pt"."productId"
	JOIN 
		"tags" "t" ON "t"."id"="pt"."tagId"
	GROUP BY 
		"p"."id","t"."id","pt"."id"
	ORDER BY 
		"pt"."id" ASC
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
			"productTags"
	`
	const values = []
	const {rows} = await db.query(sql, values)
	return rows[0].counts
};

exports.selectOne = async (id) => {
	const sql = 
	`
	SELECT 
		"pt"."id",
		"pt"."productId",
		"pt"."tagId",
		CONCAT("p"."name", ' - ', "t"."name") "productTag",
		"pt"."createdAt",
		"pt"."updatedAt"
	FROM 
		"productTags" "pt"
	JOIN 
		"products" "p" ON "p"."id"="pt"."productId"
	JOIN 
		"tags" "t" ON "t"."id"="pt"."tagId"
	WHERE 
		"pt"."id" = $1
	GROUP BY 
		"p"."id","t"."id","pt"."id"
	`
	const values = [id]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.selectOneByProductIdAndTagId = async (productId, tagId) => {
	const sql = 
	`
		SELECT 
			"pt"."id",
			"pt"."productId",
			"pt"."tagId",
			CONCAT("p"."name", ' - ', "t"."name") "productTag",
			"pt"."createdAt",
			"pt"."updatedAt"
		FROM 
			"productTags" "pt"
		JOIN 
			"products" "p" ON "p"."id"="pt"."productId"
		JOIN 
			"tags" "t" ON "t"."id"="pt"."tagId"
		WHERE 
			"pt"."productId" = $1 AND "pt"."tagId" = $2
		GROUP BY 
			"p"."id","t"."id","pt"."id"

	`
	const values = [productId,tagId]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.insert = async (data) => {
	const sql = 
	`
	INSERT INTO 
		"productTags"
		("productId","tagId")
	VALUES
		($1,$2)
	RETURNING *
	`
	const values = [data.productId, data.tagId]
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
		"productTags"
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
			"productTags"
		WHERE 
			"id" = $1
		RETURNING *
	`
	const values = [id];
	const {rows} = await db.query(sql, values);
	return rows[0]
};