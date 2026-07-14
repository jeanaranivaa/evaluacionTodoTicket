/*
    Campos:
    customerId
    quantity
    purchaseDate
    total
    paymentStatus
    transactionId
*/ 

import { Schema, model } from "mongoose";

const ticketsSchema = new Schema ({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: Boolean},
    transactionId: {type: String},
})

