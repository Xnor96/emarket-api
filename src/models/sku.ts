import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true},
    price: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })


const Sku = mongoose.model("Sku", schema);
export default Sku