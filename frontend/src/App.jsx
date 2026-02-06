import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BookingListPage from "./pages/BookingListPage"
import CreateBooking from "./pages/CreateBooking"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<BookingListPage />} />
          <Route path="/create" element={<CreateBooking />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
