const db = require('../lib/db.lib')

exports.selectAll = async (keyword='', sort, page=1, limit) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT 
		"p"."id",
		"p"."name",
		array_agg(DISTINCT "c"."name") "category",
		"p"."basePrice",
		"p"."description",
		"p"."image",
		"p"."isRecommended",
		"p"."createdAt",
		"p"."updatedAt"
	FROM 
		"products" "p"
	LEFT JOIN 
		"productCategories" "pc" ON "pc"."productId"="p"."id"
	LEFT JOIN 
		"categories" "c" ON "c"."id"="pc"."categoryId"
	WHERE 
		"p"."name" ILIKE $1
	GROUP BY 
		"p"."id"
	ORDER BY
		${sort == "category" ? `"c"."name"` : `"p".${sort}`} ASC
	LIMIT ${limit} OFFSET ${offset}
	`
	const values = [`%${keyword}%`]
	const {rows} = await db.query(sql,values)
	return rows
};

exports.countAll = async (keyword='')=>{
	const sql = 
	`
	SELECT 
		COUNT(*) as "counts"
	FROM
		(SELECT 
			"p"."id",
			"p"."name",
			array_agg(DISTINCT "c"."name") "category",
			"p"."basePrice",
			"p"."description",
			"p"."image",
			"p"."isRecommended",
			"p"."createdAt",
			"p"."updatedAt"
		FROM 
			"products" "p"
		LEFT JOIN 
			"productCategories" "pc" ON "pc"."productId"="p"."id"
		LEFT JOIN 
			"categories" "c" ON "c"."id"="pc"."categoryId"
		WHERE 
			"p"."name" ILIKE $1
		GROUP BY 
			"p"."id") AS "data"
	`
	const values = [`%${keyword}%`]
	const {rows} = await db.query(sql, values)
	return rows[0].counts
}

exports.selectOne = async (id) => {
	const sql = 
	`
	SELECT
		*
	FROM
		"products"
	WHERE 
		"id" = $1
	`

	const values = [id]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.selectOneDetailed = async (id) => {
	const sql = 
	`
	SELECT
		"p"."id",
		"p"."name",
		"c"."name" "category",
		ARRAY_AGG(
			DISTINCT JSONB_BUILD_OBJECT(
				'id',"s"."id",'size',"s"."name",'additionalPrice',"s"."additionalPrice"
				)
			) AS "sizes",
		ARRAY_AGG(
			DISTINCT JSONB_BUILD_OBJECT(
				'id',"v"."id",'variant',"v"."name",'additionalPrice',"v"."additionalPrice"
				)
			) AS "variants",
		"p"."description",
		"p"."basePrice",
		"p"."image",
		"p"."isRecommended",
		"p"."createdAt",
		"p"."updatedAt"
	FROM 
		"products" "p"
	INNER JOIN 
		"productVariants" "pv" ON "pv"."productId" = "p"."id"
	INNER JOIN 
		"productSizes" "ps" ON "ps"."productId" = "p"."id"
	INNER JOIN 
		"productCategories" "pc" ON "pc"."productId" = "p"."id"
	RIGHT JOIN 
		"variants" "v" ON "v"."id"="pv"."variantId"
	RIGHT JOIN 
		"sizes" "s" ON "s"."id"="ps"."sizeId"
	RIGHT JOIN 
		"categories" "c" ON "c"."id"="pc"."categoryId"
	WHERE 
		"p"."id" = $1
	GROUP BY 
		"p"."id", "p"."name", "c"."name"
	`

	const values = [id]
	const {rows} = await db.query(sql, values)
	return rows[0]
};

exports.insert = async (data) => {
	const sql = 
	`
	INSERT INTO "products" 
		("name","basePrice","description","image","isRecommended")
	VALUES
		($1,$2,$3,$4,$5)
	RETURNING *
	`
	const values = [data.name, data.basePrice, data.description, data.image, data.isRecommended]
	const {rows} = await db.query(sql, values)
	return rows[0]
}

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
		"products"
	SET 
		${column.join(', ')}, "updatedAt" = now()
	WHERE 
		"id" = $1
	RETURNING *
	`
	const {rows} = await db.query(sql, values)
	return rows[0]
}

exports.delete = async (id) => {
	const sql = 
	`
		DELETE FROM 
			"products"
		WHERE 
			"id" = $1
		RETURNING *
	`
	const values = [id];
	const {rows} = await db.query(sql, values);
	return rows[0]
}