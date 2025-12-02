import mongoose from "mongoose";
const {model, Schema} = mongoose;

const PaymentSchema = new Schema({
    name: { type: String, required: true },
    to_user : { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String ,default: "Good Work" },
    o_id : { type: String, required: true },
    createdat : { type: Date, default: Date.now },
    updatedat : { type: Date, default: Date.now },
    done : { type: Boolean, default: false },
});

export default mongoose.models.Payment || model("Payment", PaymentSchema);