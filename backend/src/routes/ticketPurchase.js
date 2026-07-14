import express from "express"
import ticketPurchaseController from "../controllers/ticketPurchaseController.js";

const router = express.Router();

router.route("/")
    .get(ticketPurchaseController.getTicket)
    .post(ticketPurchaseController.insertTicket);

router
    .route("/:id")
    .put(ticketPurchaseController.updateTicket)
    .delete(ticketPurchaseController.deleteTicket);

export default router;