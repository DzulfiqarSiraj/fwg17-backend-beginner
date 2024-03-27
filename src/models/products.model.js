const db = require('../lib/db.lib')

exports.selectAll = async (keyword='', sort, page=1, limit, isRecommended) => {
	const offset = (page-1) * limit
	const sql = 
	`
	SELECT
		"p"."id" AS "id",
		"p"."name" AS "name",
		array_agg(distinct "c"."name") AS "category",
		"p"."description" AS "description",
		"p"."basePrice" AS "basePrice",
		"t"."name" AS "tag",
		"t"."discount" AS "discount",
		"p"."image" AS "image",
		"p"."isRecommended",
		"p"."createdAt" AS "createdAt",
		"p"."updatedAt" AS "updatedAt"
	FROM
		"products" "p"
	FULL JOIN
		"productCategories" "pc" ON "pc"."productId"="p"."id"
	FULL JOIN 
		"productTags" "pt" ON "pt"."productId"="p"."id"
	FULL JOIN 
		"categories" "c" ON "c"."id"="pc"."categoryId"
	FULL JOIN 
		"tags" "t" ON "t"."id"="pt"."tagId"
	WHERE 
		"p"."name" ILIKE $1
		${isRecommended? `AND "p"."isRecommended" = TRUE` : ''}
	GROUP BY 
		"p"."id","c"."id","t"."id"
	ORDER BY
		${sort == "category" ? `"c"."name"` : `"p".${sort}`} ASC
	LIMIT ${limit} OFFSET ${offset}
	`
	const values = [`%${keyword}%`]
	const {rows} = await db.query(sql,values)
	return rows
};

exports.countAll = async (keyword='', isRecommended)=>{
	const sql = 
	`
	SELECT 
		COUNT(*) as "counts"
	FROM
		(SELECT
			"p"."id" AS "id",
			"p"."name" AS "name",
			array_agg(distinct "c"."name") AS "category",
			"p"."description" AS "description",
			"p"."basePrice" AS "basePrice",
			"t"."name" AS "tag",
			"t"."discount" AS "discount",
			"p"."image" AS "image",
			"p"."isRecommended",
			"p"."createdAt" AS "createdAt",
			"p"."updatedAt" AS "updatedAt"
		FROM
			"products" "p"
		FULL JOIN
			"productCategories" "pc" ON "pc"."productId"="p"."id"
		FULL JOIN 
			"productTags" "pt" ON "pt"."productId"="p"."id"
		FULL JOIN 
			"categories" "c" ON "c"."id"="pc"."categoryId"
		FULL JOIN 
			"tags" "t" ON "t"."id"="pt"."tagId"
		WHERE 
			"p"."name" ILIKE $1
			${isRecommended? `AND "p"."isRecommended" = TRUE` : ''}
		GROUP BY 
			"p"."id","c"."id","t"."id") AS "data"
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
		"t"."name" "tag",
		"p"."description",
		"p"."basePrice",
		"t"."discount",
		"p"."image",
		"p"."isRecommended",
		"p"."createdAt",
		"p"."updatedAt"
	FROM 
		"products" "p"
	FULL JOIN 
		"productVariants" "pv" ON "pv"."productId" = "p"."id"
	FULL JOIN 
		"productSizes" "ps" ON "ps"."productId" = "p"."id"
	FULL JOIN 
		"productCategories" "pc" ON "pc"."productId" = "p"."id"
	FULL JOIN
		"productTags" "pt" ON "pt"."productId"="p"."id"
	FULL JOIN 
		"variants" "v" ON "v"."id"="pv"."variantId"
	FULL JOIN 
		"sizes" "s" ON "s"."id"="ps"."sizeId"
	FULL JOIN 
		"categories" "c" ON "c"."id"="pc"."categoryId"
	FULL JOIN
		"tags" "t"ON "t"."id"="pt"."tagId"
    WHERE "p"."id" IS NOT NULL AND "p"."id" = $1
	GROUP BY 
		"p"."id", "p"."name", "c"."name","t"."id"
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