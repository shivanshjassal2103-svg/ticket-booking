const express = require("express");
const app = express();
const PORT = 3000;

// In-memory seat store
let seats = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  status: "available", // available | locked | booked
  lockedBy: null,
  lockExpiry: null,
}));

// Helper: check and auto-release expired locks
function checkExpiredLocks() {
  const now = Date.now();
  seats.forEach((seat) => {
    if (seat.status === "locked" && seat.lockExpiry && seat.lockExpiry < now) {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockExpiry = null;
    }
  });
}

// Middleware: run lock cleanup before each request
app.use((req, res, next) => {
  checkExpiredLocks();
  next();
});

// 1️⃣ Get all seats
app.get("/seats", (req, res) => {
  res.json(
    seats.map((seat) => ({
      id: seat.id,
      status: seat.status,
    }))
  );
});

// 2️⃣ Lock a seat
app.post("/lock/:id", (req, res) => {
  const seatId = parseInt(req.params.id);
  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ message: "Seat already booked" });
  }

  if (seat.status === "locked") {
    return res
      .status(400)
      .json({ message: `Seat ${seatId} is already locked by another user` });
  }

  // Lock seat for 1 minute
  seat.status = "locked";
  seat.lockedBy = "user"; // could be replaced by user ID if available
  seat.lockExpiry = Date.now() + 60 * 1000;

  return res.json({
    message: `Seat ${seatId} is locked successfully. Confirm within 1 minute`,
  });
});

// 3️⃣ Confirm booking
app.post("/confirm/:id", (req, res) => {
  const seatId = parseInt(req.params.id);
  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ message: "Seat already booked" });
  }

  if (seat.status !== "locked") {
    return res
      .status(400)
      .json({ message: "Seat is not locked and cannot be booked" });
  }

  // Confirm booking
  seat.status = "booked";
  seat.lockedBy = null;
  seat.lockExpiry = null;

  return res.json({ message: `Seat ${seatId} booked successfully` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
