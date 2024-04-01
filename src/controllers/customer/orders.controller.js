const ordersModel = require('../../models/orders.model')
const orderDetailsModel = require('../../models/orderDetails.model')
const {resFalse, resTrue, pageHandler, randNumGen} = require('../../utils/handler')

exports.getAllOrders = async (req, res) => {
    try {
        const {userId, status , page = 1, limit = 5} = req.query

        const count = Number(await ordersModel.countAllByUserId(userId, status))

        const pagination = pageHandler(count, limit, page)

        const orders = await ordersModel.selectAllByUserId(userId, status, page, limit)

        return resTrue(res, 'List All Orders', true, true, pagination, orders)
    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Order')
    }
};

exports.getDetailOrder = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const order = await ordersModel.selectOne(id)
        
        if(!order) {
            throw new Error(`Id is not found`)
        }

        return resTrue(res, 'Order Detail', false, true, null, order)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Order')
    }
};

exports.createOrder = async (req, res) => {
    try {
        const {id} = req.user
        const {cartData} = req.body
        const {email, fullname, address} = req.body.custData
        const shipping = req.body.shippingData
        const shippingPrice = Number(req.body.shippingPrice)

        // grandTotal Calculation
        let total = cartData.reduce((prev, curr) => {
            const basePrice = Number(curr.product.basePrice)
            let discount
            if(curr.product.discount === null){
                discount = Number(0)
            } else {
                discount = parseFloat(curr.product.discount)
            }
            const sizePrice = Number(curr.size.additionalPrice)
            const variantPrice = Number(curr.variant.additionalPrice)
            const quantity = Number(curr.quantity)
            
            return prev + (((basePrice - (basePrice * discount))+sizePrice+variantPrice) * quantity)
        }, 0);

        console.log(shippingPrice)
        const status = 'Awaiting Payment'
        const orderNum = randNumGen()
        const tax = 0.05

        const order = await ordersModel.insert({
            userId      : id,
            orderNumber : orderNum,
            fullName    : fullname,
            email       : email,
            promoId     : null,
            tax         : tax,
            grandTotal  : (total + (total * tax)) + shippingPrice,
            deliveryAddress : address,
            status      : status,
            shipping    : shipping
        })

        const orderId = await ordersModel.selectIdByOrderNum(orderNum)
        
        // Add Data Order to Order Detail
        if(orderId){
            cartData.forEach(async (data) => {
                const basePrice = Number(data.product.basePrice)
                let discount
                if(data.product.discount === null){
                    discount = Number(0)
                } else {
                    discount = parseFloat(data.product.discount)
                }
                const sizePrice = Number(data.size.additionalPrice)
                const variantPrice = Number(data.variant.additionalPrice)
                const quantity = Number(data.quantity)
                let subTotal = Number(((basePrice - (basePrice * discount)) + sizePrice + variantPrice) * quantity)
                await orderDetailsModel.insert({
                    userId              : id,
                    orderId             : orderId.id,
                    productId           : data.product.id,
                    productSizeId       : data.size.id,
                    productVariantId    : data.variant.id,
                    quantity            : data.quantity,
                    subTotal            : subTotal
                })
            });
        }

        if(req.body){
            return res.json({
                success: true,
                message: "Create Order Successfully"
            })
        }

        return resTrue(res, 'Create New Order Successfully',false, true, null, order)

    } catch (error) {
        console.log(error)
        return resFalse(error, res, error.message, 'Order')
    }
};

// exports.updateOrder = async (req, res) => {
//     try {
//         const id = Number(req.params.id)

//         const existOrder = await ordersModel.selectOne(id)

//         if(!existOrder){
//             throw new Error(`Id is not found`)
//         }

//         if(!req.body.status){
//             throw new Error('Undefined input')
//         }

//         if(req.body.status === existOrder.status){
//             throw new Error('Duplicate,status')
//         }
        
//         const order = await ordersModel.update(id, req.body)

//         return resTrue(res,'Update Order Successfully',false,true,null,order)
//     } catch (error) {
//         console.log(error)
//         return resFalse(error, res, error.message, 'Order')
//     }
// };

// exports.deleteOrder = async (req, res) => {
//     try {
//         const id = Number(req.params.id)

//         const existOrder = await ordersModel.selectOne(id)

//         if(!existOrder){
//             throw new Error(`Id is not found`)
//         }

//         const order = await ordersModel.delete(id)

//         return resTrue(res,'Delete Order Successfully',false,true,null,order)

//     } catch (error) {
//         console.log(error)
//         return resFalse(error, res, error.message,'Order')
//     }
// };