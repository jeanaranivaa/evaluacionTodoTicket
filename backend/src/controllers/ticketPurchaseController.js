const ticketPurchaseController = {}

import ticketPurchaseModel from "../models/ticketPurchase.js"

ticketPurchaseController.getTicket = async (req, res) => {
    const tickets = await ticketPurchaseModel.find();
    res.json(tickets);
};

//Insert