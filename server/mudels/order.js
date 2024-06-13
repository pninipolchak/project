import mongoose from "mongoose";
import Joi from "joi";
import { ObjectId } from "bson";

const minimalProduct = mongoose.Schema({
    amount: Number,
    productName: String,
    cost: Number
});

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    sendingDate: { type: Date, default: new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000)) },
    idUser:String,
    adress: String,
    isSending: { type: Boolean, default: false },
    products:[minimalProduct]
});

export const validateOrder = (_order) => {
    let orderSchema = Joi.object({
        idUser: Joi.string().pattern((/^[0-9a-fA-F]{24}$/)).required(),
        adress: Joi.string().required(),
        products: Joi.array().items(
            Joi.object({
            amount: Joi.number().min(1),
            productName: Joi.string().required(),
            cost: Joi.number().min(0).required()
        })
        ).min(1).required()
    });
    return orderSchema.validate(_order);
}


export const Order = mongoose.model("orders", orderSchema);



