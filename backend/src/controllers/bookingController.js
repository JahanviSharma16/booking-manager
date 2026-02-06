import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const { customer, bookingDate, bookingType, notes} = req.body

        if(!customer?.name || !customer?.email || !bookingDate ) {
            return res.status(400).json({
                message: "Name, email and booking date are required",
            })
        }

        const booking = await Booking.create({
            customer,
            bookingDate,
            bookingType,
            notes,
        })

        res.status(201).json({
            message: "Booking created successfully",
            data: booking,
        })
    } catch (error ){
        res.status(500).json({
            message: "Failed to create booking",
            error: error.message,
        })
    }
}

export const getAllBooking = async (req, res) => {
    try{
        const bookings = await Booking.find().sort({ createdAt: -1})

        res.status(200).json({
            count: bookings.length,
            data: bookings,
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message,
        })
    }
}