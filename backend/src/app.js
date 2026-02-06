import express from "express"
import cors from "cors"
import bookingRoutes from "./routes/bookingRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Booking Manager API is running 🚀")
})

app.use("/api/bookings", bookingRoutes)

export default app
