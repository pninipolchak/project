import mongoose from "mongoose";
import {Order, validateOrder} from "../mudels/order.js";


const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}


const getOrderByIdUser = async (req, res) => {
    try {
        let id = req.user._id;

        let orders = await Order.find({idUser:id});

        if (!orders)
            return res.status(400).json({ type: "get error", message: "you dont have any orders" })
        res.json(orders);
    }

    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }

}

const addOrder = async (req, res) => {
    try {
    let { idUser,adress,products} = req.body;
        let result = validateOrder(req.body)
        if (result.error)
            return res.status(400).json({ type: "Invalid data", message: result.error.details[0].message })

        let newOrder = await Order.create({
            idUser,adress,products
        })
        res.json(newOrder);

    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const deleteOrderByID = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let orderToDelete = await Order.findOne({ _id: id });

        if (!(req.user._id == orderToDelete.idUser || req.user.role == 'ADMIN')) {
            return res.status(403).json({ type: "permition errore", message: "you are not premmitted" })
        }
        
        if (orderToDelete.isSending) {
            return res.status(400).json({ type: "delete errore", message: "order alredy sending" })
        }

        let deleteOrder = await Order.findByIdAndDelete({_id:id});
        if (!deleteOrder)
            return res.status(400).json({ type: "id error", message: "order is not appear" })
        res.json(deleteOrder);
    }
    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }
}

const updateOrderIsSending = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let updateOrder = await Order.findById({_id:id});
        if (!updateOrder)
            return res.status(400).json({ type: "id error", message: "order is not appear" })
        await Order.findByIdAndUpdate(id, { isSending: true })
        updateOrder = await Order.findById({_id:id})
        res.json(updateOrder);
    }
    catch (err) {
            res.status(404).json({ type: "error", message:err.message })
        }
    
}
export {getAllOrders, addOrder,deleteOrderByID,updateOrderIsSending,getOrderByIdUser};






