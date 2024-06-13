import mongoose from "mongoose";
import Joi from "joi";

const productSchema = mongoose.Schema({
    productName: String,
    description: String,
    // donorName: String,
    // monetaryValue: Number,
    cost: Number,
    urlImg:String
});

export const validateProduct = (_product) => {
    let productSchema = Joi.object({
        productName: Joi.string().required(),
        description: Joi.string().min(10).max(150).required(),
        // donorName: Joi.string(),
        // monetaryValue: Joi.number().min(0),
        cost: Joi.number().min(0).required(),
        urlImg:Joi.string().required()
    });
    return productSchema.validate(_product);
}


export const Product = mongoose.model("products", productSchema);



