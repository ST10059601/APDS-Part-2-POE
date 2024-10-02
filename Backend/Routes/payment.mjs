import express from "express";
import db from "../db/conn.mjs";
import checkauth from "../check-auth.mjs";  // Middleware for JWT verification

const router = express.Router();

// Payment Request Route
router.post("/request", checkauth, async (req, res) => {
  const { amount, currency, provider, recipientAccount, swiftCode } = req.body;

  // Validate that all required fields are provided
  if (!amount || !currency || !provider || !recipientAccount || !swiftCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const paymentRequest = {
      amount,
      currency,
      provider,
      recipientAccount,
      swiftCode,
      requestedBy: req.userData.userId,  // Storing userId from JWT as a foreign key
      status: "pending",  // Default status
      createdAt: new Date(),
    };

    const collection = await db.collection("paymentRequests");
    const result = await collection.insertOne(paymentRequest);

    res.status(201).json({
      message: "Payment request submitted successfully",
      requestId: result.insertedId,
    });
  } catch (error) {
    console.error("Payment request error:", error);
    res.status(500).json({ message: "Payment request failed" });
  }
});

export default router;
