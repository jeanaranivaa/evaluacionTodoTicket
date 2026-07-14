const ticketPurchaseController = {}

import ticketPurchaseModel from "../models/ticketPurchase.js"

ticketPurchaseController.getTicket = async (req, res) => {
    const tickets = await ticketPurchaseModel.find();
    res.json(tickets);
};

//Insert
ticketPurchaseController.insertTicket = async (req, res) => {
    const { customerId, quantity, purchaseDate, total, paymentStatus, transactionId } = req.body;
    const newTicket = new ticketPurchaseModel({
        customerId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId
    });
    await newTicket.save();
    res.json({ message: "Ticket saved" });
};

//Delete
ticketPurchaseController.deleteTicket = async (req, res) => {
    await ticketPurchaseModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted" })
};

//Update 
ticketPurchaseController.updateTicket = async (req, res) => {
    const { customerId, quantity, purchaseDate, total, paymentStatus, transactionId } = req.body;
    await ticketPurchaseModel.findByIdAndUpdate(
        req.params.id,
        { customerId, quantity, purchaseDate, total, paymentStatus, transactionId },
        { new: true },
    );

    res.json({ message: "Ticket updated" })
};

export default ticketPurchaseController;
