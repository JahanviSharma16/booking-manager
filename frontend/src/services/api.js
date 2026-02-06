import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:8000/api",
})

export const fetchBookings = () => API.get("/bookings")
export const createBooking = (data) => API.post("/bookings", data)

export default API