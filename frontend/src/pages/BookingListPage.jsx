import BookingList from "../components/BookingList"
import Navbar from "../components/Navbar"

const BookingListPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Bookings</h1>
          <p className="text-gray-600">Manage and view all your bookings in one place</p>
        </div>
        <BookingList />
      </div>
    </div>
  )
}

export default BookingListPage
