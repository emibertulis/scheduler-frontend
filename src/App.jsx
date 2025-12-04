import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  // Load bookings from backend
  const loadBookings = async () => {
    try {
      const res = await fetch("https://scheduler-backend-qhdh.onrender.com/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = { name, phone, service, date, time };
console.log("About to call backend...");

    try {
      const response = await fetch("https://scheduler-backend-qhdh.onrender.com/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Booking saved successfully! ✅");

        // Clear the form
        setName("");
        setPhone("");
        setService("");
        setDate("");
        setTime("");

        // Reload bookings list
        loadBookings();
      } else {
        alert("Something went wrong saving your booking.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Cannot reach the server. Is the backend running?");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Booking form card */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Book an Appointment
          </h2>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0 10px" }}
            />

            <label>Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0 10px" }}
            />

            <label>Service</label>
            <input
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0 10px" }}
            />

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0 10px" }}
            />

            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0 20px" }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#4a90e2",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Submit Booking
            </button>
          </form>
        </div>

        {/* Bookings list card */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>All Bookings</h3>

          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Service
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          padding: "8px",
                        }}
                      >
                        {b.name}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          padding: "8px",
                        }}
                      >
                        {b.phone}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          padding: "8px",
                        }}
                      >
                        {b.service}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          padding: "8px",
                        }}
                      >
                        {b.date}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          padding: "8px",
                        }}
                      >
                        {b.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

