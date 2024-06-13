import mongoose from "mongoose";
import {Product, validateProduct} from "../mudels/product.js";


const getAllProduct = async (req, res) => {

    let { search } = req.query;
    let fieldToSearch = req.query.fieldToSearch || "productName";
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    let ex1 = new RegExp(`${search}`)
    
    try {
        let filter = {};
        if (search)
            filter[`${fieldToSearch}`]= ex1;

        let allProduct = await Product.find(filter)
        .skip((page - 1) * perPage)
            .limit(perPage);
        
        res.json(allProduct);
    }
    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }
}

const getByID = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let product = await Product.findOne({_id:id});

        if (!product)
            return res.status(400).json({ type: "id error", message: "id is not appear" })
        res.json(product);
    }

    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }

}

const addProduct = async (req, res) => {
    try {
    let { productName,description,cost,urlImg} = req.body;
        let result = validateProduct(req.body)
        if (result.error)
            return res.status(400).json({ type: "Invalid data", message: result.error.details[0].message })

        let sameProduct = await Product.findOne({ productName });
        if (sameProduct)
            return res.status(409).json({ type: "same productName", message: "change productName " })

        let newProduct = await Product.create({
            productName,description,cost,urlImg
        })
        res.json(newProduct);

    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const deleteProductByID = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let deleteProduct = await Product.findByIdAndDelete({_id:id});
        if (!deleteProduct)
            return res.status(400).json({ type: "id error", message: "product is not appear" })
        res.json(deleteProduct);
    }
    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let updateProduct = await Product.findById({_id:id});
        if (!updateProduct)
            return res.status(400).json({ type: "id error", message: "product is not appear" })
        await Product.findByIdAndUpdate(id, req.body)
        updateProduct = await Product.findById({_id:id})
        res.json(updateProduct);
    }
    catch (err) {
            res.status(404).json({ type: "error", message:err.message })
        }
    
}
export { getAllProduct ,getByID,addProduct,deleteProductByID,updateProduct};





