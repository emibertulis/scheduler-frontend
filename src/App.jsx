import { useState, useEffect } from "react";

const API_BASE = "https://scheduler-backend-qhdh.onrender.com";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
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

    try {
      const response = await fetch(`${API_BASE}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Booking saved successfully! ✅");

        setName("");
        setPhone("");
        setService("");
        setDate("");
        setTime("");

        loadBookings();
      } else {
        alert("Something went wrong saving your booking.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Cannot reach the server. Is the backend running?");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        loadBookings();
      } else {
        alert("Error deleting booking.");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Cannot reach the server. Is the backend running?");
    }
  };

  const scrollToDemo = () => {
    const el = document.getElementById("schedulo-demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3F4F6",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#111827",
      }}
    >
      {/* HERO SECTION */}
      <header
        style={{
          background:
            "linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #8B5CF6 100%)",
          color: "white",
          padding: "32px 16px 56px",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Top bar / logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "999px",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2563EB",
                  fontWeight: 800,
                  fontSize: "18px",
                }}
              >
                S
              </div>
              <span style={{ fontWeight: 700, fontSize: "20px" }}>Schedulo</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "14px",
                opacity: 0.9,
              }}
            >
              <span>For cleaners</span>
              <span>For trades</span>
              <span>For beauty & health</span>
            </div>
          </div>

          {/* Hero content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(15,23,42,0.35)",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "#22C55E",
                  }}
                />
                <span>Live demo • No sign-up needed</span>
              </div>
              <h1
                style={{
                  fontSize: "32px",
                  lineHeight: 1.2,
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                Simple online bookings for busy service businesses.
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "rgba(249,250,251,0.9)",
                  marginBottom: "18px",
                }}
              >
                Stop juggling WhatsApp, phone calls and notebooks. Schedulo puts
                all your appointments in one place and lets your clients book
                themselves in seconds — from any device, 24/7.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={scrollToDemo}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "999px",
                    border: "none",
                    background: "white",
                    color: "#2563EB",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Try Schedulo live
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "12px",
                    opacity: 0.9,
                  }}
                >
                  <span>• No credit card</span>
                  <span>• Built for local businesses</span>
                </div>
              </div>
            </div>

            {/* Quick highlights */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                fontSize: "13px",
              }}
            >
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(15,23,42,0.35)",
                }}
              >
                ✅ Reduce no-shows & confusion
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(15,23,42,0.35)",
                }}
              >
                ✅ One place for all appointments
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(15,23,42,0.35)",
                }}
              >
                ✅ Clients book 24/7 without calling
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT WRAPPER */}
      <main
        style={{
          maxWidth: "960px",
          margin: "-32px auto 40px",
          padding: "0 16px 32px",
        }}
      >
        {/* Benefits grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
              Built for real-world businesses
            </h3>
            <p style={{ fontSize: "14px", color: "#4B5563" }}>
              Perfect for cleaners, mobile mechanics, barbers, lash techs,
              personal trainers, therapists, handymen and more. If you take
              bookings, Schedulo fits.
            </p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
              No more WhatsApp chaos
            </h3>
            <p style={{ fontSize: "14px", color: "#4B5563" }}>
              Replace DMs, calls and scribbled notes with a clean list of
              upcoming bookings you can access anywhere.
            </p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
              Simple by design
            </h3>
            <p style={{ fontSize: "14px", color: "#4B5563" }}>
              No complicated dashboards or training needed. If you can use
              WhatsApp, you can use Schedulo.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section
          style={{
            marginBottom: "32px",
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            How Schedulo works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              fontSize: "14px",
              color: "#4B5563",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: "4px",
                  color: "#2563EB",
                }}
              >
                1. Share your booking link
              </div>
              <p>
                Post it on Instagram, TikTok, your website, business card, or
                send directly in WhatsApp.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: "4px",
                  color: "#2563EB",
                }}
              >
                2. Clients book themselves
              </div>
              <p>
                They pick a service, choose a time and leave their details. No
                back-and-forth messaging.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: "4px",
                  color: "#2563EB",
                }}
              >
                3. You see everything in one place
              </div>
              <p>
                Open Schedulo and see who&apos;s booked, when, and what they
                booked — from any device.
              </p>
            </div>
          </div>
        </section>

        {/* LIVE DEMO SECTION */}
        <section
          id="schedulo-demo"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.2fr)",
            gap: "20px",
            alignItems: "flex-start",
            marginBottom: "32px",
          }}
        >
          {/* Booking form card */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
            }}
          >
            <h2
              style={{
                textAlign: "left",
                marginBottom: "4px",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Try the booking form
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#6B7280",
                marginBottom: "14px",
              }}
            >
              This is a live demo. Add a test booking below to see how it appears
              in the dashboard.
            </p>

            <form onSubmit={handleSubmit}>
              <label style={{ fontSize: "13px" }}>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0 10px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                }}
              />

              <label style={{ fontSize: "13px" }}>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0 10px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                }}
              />

              <label style={{ fontSize: "13px" }}>Service</label>
              <input
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Full house clean"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0 10px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                }}
              />

              <label style={{ fontSize: "13px" }}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0 10px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                }}
              />

              <label style={{ fontSize: "13px" }}>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0 16px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Submit booking
              </button>
            </form>
          </div>

          {/* Bookings list card */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
            }}
          >
            <h3
              style={{
                marginBottom: "8px",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              Bookings dashboard
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6B7280",
                marginBottom: "14px",
              }}
            >
              Every time someone books, it appears here. Imagine this filled with
              your real clients.
            </p>

            {bookings.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#4B5563" }}>
                No bookings yet. Add one using the form.
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                        }}
                      >
                        Phone
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                        }}
                      >
                        Service
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                        }}
                      >
                        Time
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id}>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          {b.name}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          {b.phone}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          {b.service}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          {b.date}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          {b.time}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          <button
                            onClick={() => handleDelete(b._id)}
                            style={{
                              padding: "6px 10px",
                              background: "#EF4444",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Simple CTA footer section */}
        <section
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6B7280",
            marginTop: "12px",
          }}
        >
          <p>
            Ready to use Schedulo for your own business? This demo is just the
            start — customise services, add staff, and plug it into your socials.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
