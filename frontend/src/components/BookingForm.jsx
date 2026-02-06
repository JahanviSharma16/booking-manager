import { useState } from "react"
import { createBooking } from "../services/api"

const BookingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingType: "service",
    notes: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await createBooking({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        bookingDate: formData.bookingDate,
        bookingType: formData.bookingType,
        notes: formData.notes,
      })

      setSuccess("Booking created successfully! 🎉")
      setFormData({
        name: "",
        email: "",
        phone: "",
        bookingDate: "",
        bookingType: "service",
        notes: "",
      })

      setTimeout(() => {
        onSuccess && onSuccess()
      }, 1500)
    } catch {
      setError("Failed to create booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <span className="mr-2">📝</span>
          Create New Booking
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <span className="mr-2">⚠️</span>
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <span className="mr-2">✅</span>
            <span className="text-sm">{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">
              Booking Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="bookingDate"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bookingType" className="block text-sm font-medium text-gray-700">
              Booking Type <span className="text-red-500">*</span>
            </label>
            <select
              id="bookingType"
              name="bookingType"
              value={formData.bookingType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="service">🔧 Service</option>
              <option value="consultation">💬 Consultation</option>
              <option value="meeting">🤝 Meeting</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Any special requirements or notes..."
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Booking...
              </>
            ) : (
              <>
                <span className="mr-2">✨</span>
                Create Booking
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm
