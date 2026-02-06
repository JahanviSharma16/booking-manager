import { useNavigate } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import Navbar from "../components/Navbar"

const CreateBooking = () => {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Booking</h1>
          <p className="text-gray-600">Fill in the details below to create a new booking</p>
        </div>
        <BookingForm onSuccess={handleSuccess} />
      </div>
    </div>
  )
}

export default CreateBooking
