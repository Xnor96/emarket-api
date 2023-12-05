import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Sku: { type: mongoose.Schema.Types.ObjectId, ref: 'Sku' },
    quantity: { type: Number, default: 0 }
}, { timestamps: true })


const ShoppingCart = mongoose.model("ShoppingCart", schema);
export default ShoppingCart