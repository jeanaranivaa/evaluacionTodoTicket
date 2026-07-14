import express from "express"
import ticketPurchaseController from "../controllers/ticketPurchaseController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/")
    .get(
        validateAuthCookie(["admin"]),
        ticketPurchaseController.getTicket
    )

    .post(
        validateAuthCookie(["customer"]),
        ticketPurchaseController.insertTicket
    );

router.route("/:id")
    .put
    (ticketPurchaseController.updateTicket)
    .delete(ticketPurchaseController.deleteTicket);

export default router;