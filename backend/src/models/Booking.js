import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
       customer: {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        phone: {
            type: String,
            trim: true,
        },
       },

       bookingDate: {
        type: Date,
        required: true,
       },

       bookingType: {
        type: String,
        enum: ["consultation", "service", "meeting"],
        default: "service",
       },

       status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
       },

       notes: {
        type: String,
        trim: true,
        maxlength: 500,
       },
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking