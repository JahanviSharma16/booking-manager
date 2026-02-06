import { useEffect, useState } from "react"
import { fetchBookings } from "../services/api"

const BookingList = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchBookings()
        setBookings(response.data.data)
      } catch {
        setError("Failed to load bookings")
      } finally {
        setLoading(false)
      }
    }

    getBookings()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">⚠️ {error}</div>
        <p className="text-gray-600">Please try again later</p>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
        <p className="text-gray-600 mb-6">Create your first booking to get started</p>
        <button 
          onClick={() => window.location.href = '/create'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Create Your First Booking
        </button>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getBookingTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'service':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'consultation':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'meeting':
        return 'bg-green-50 text-green-700 border-green-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {booking.customer?.name || 'Unknown Customer'}
                </h3>
                <p className="text-sm text-gray-600 flex items-center">
                  📧 {booking.customer?.email || 'No email'}
                </p>
                {booking.customer?.phone && (
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    📱 {booking.customer.phone}
                  </p>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                {booking.status || 'pending'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="text-gray-500 mr-2">📅</span>
                <span className="text-gray-700">
                  {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <span className="text-gray-500 mr-2">⏰</span>
                <span className="text-gray-700">
                  {new Date(booking.bookingDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getBookingTypeColor(booking.bookingType)}`}>
                  {booking.bookingType || 'service'}
                </span>
              </div>
              
              {booking.notes && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    📝 {booking.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingList
