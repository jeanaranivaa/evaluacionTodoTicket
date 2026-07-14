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
    .put(
        validateAuthCookie(["customer", "admin"]),
        ticketPurchaseController.updateTicket
    )
    .delete(
        validateAuthCookie(["admin"]),
        ticketPurchaseController.deleteTicket
    );

export default router;
