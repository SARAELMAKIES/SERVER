import { Schema, model } from "mongoose"

const productSchema = Schema({
    name: String,
    description: String,
    date: { type: Date, default: new Date() },
    img: String,
    price: Number,
    category: String,
    ingredient: [String]
})
export {productSchema}
export const productModel=model("product",productSchema)