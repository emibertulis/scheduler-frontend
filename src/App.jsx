import { useState, useEffect } from "react";

const API_BASE = "https://scheduler-backend-qhdh.onrender.com";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [customService, setCustomService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending");
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  const scrollToDemo = () => {
    const el = document.getElementById("schedulo-demo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setService("");
    setCustomService("");
    setDate("");
    setTime("");
    setNotes("");
    setStatus("Pending");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalService =
      service === "custom" ? customService || "Custom service" : service;

    const bookingData = {
      name,
      phone,
      service: finalService,
      date,
      time,
      notes,
      status,
    };

    try {
      const url = editingId
        ? `${API_BASE}/bookings/${editingId}`
        : `${API_BASE}/book`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          editingId
            ? "Booking updated successfully! ✅"
            : "Booking saved successfully! ✅"
        );
        resetForm();
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

  const handleEdit = (booking) => {
    setEditingId(booking._id);
    setName(booking.name);
    setPhone(booking.phone);
    setDate(booking.date);
    setTime(booking.time);
    setNotes(booking.notes || "");
    setStatus(booking.status || "Pending");

    const presetServices = [
      "Standard Clean",
      "Deep Clean",
      "End of Tenancy",
      "One-off Clean",
      "Weekly Clean",
      "Fortnightly Clean",
      "Garden Work",
      "Window Cleaning",
      "Car Valet",
    ];

    if (presetServices.includes(booking.service)) {
      setService(booking.service);
      setCustomService("");
    } else {
      setService("custom");
      setCustomService(booking.service);
    }

    const el = document.getElementById("schedulo-demo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleStatus = async (booking) => {
    const newStatus = booking.status === "Confirmed" ? "Pending" : "Confirmed";

    try {
      const res = await fetch(`${API_BASE}/bookings/${booking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        loadBookings();
      } else {
        alert("Error updating status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Cannot reach the server. Is the backend running?");
    }
  };

  const statusBadgeStyle = (statusValue) => {
    const base = {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 8px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 600,
    };
    if (statusValue === "Confirmed") {
      return {
        ...base,
        background: "#DCFCE7",
        color: "#15803D",
        border: "1px solid #22C55E",
      };
    }
    return {
      ...base,
      background: "#FEF3C7",
      color: "#92400E",
      border: "1px solid #FACC15",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3F4F6",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
              <span>For home services</span>
              <span>For local businesses</span>
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
                  <span>• Built for cleaners & services</span>
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
              Perfect for cleaners, mobile mechanics, gardeners, barbers, lash
              techs, personal trainers, handymen and more. If you take bookings,
              Schedulo fits.
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
        <section id="schedulo-demo" style={{ marginBottom: "32px" }}>
          {/* Booking form card (full width, top) */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
              marginBottom: "20px",
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
              {editingId ? "Edit booking" : "Try the booking form"}
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#6B7280",
                marginBottom: "14px",
              }}
            >
              This is a live demo connected to a real database. Add a test
              booking below to see how it appears in the dashboard — or click
              edit on an existing one.
            </p>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "12px 16px",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <label style={{ fontSize: "13px" }}>Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px" }}>Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px" }}>Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      background: "white",
                    }}
                  >
                    <option value="">Select a service</option>
                    <option value="Standard Clean">Standard Clean</option>
                    <option value="Deep Clean">Deep Clean</option>
                    <option value="End of Tenancy">End of Tenancy</option>
                    <option value="One-off Clean">One-off Clean</option>
                    <option value="Weekly Clean">Weekly Clean</option>
                    <option value="Fortnightly Clean">Fortnightly Clean</option>
                    <option value="Garden Work">Garden Work</option>
                    <option value="Window Cleaning">Window Cleaning</option>
                    <option value="Car Valet">Car Valet</option>
                    <option value="custom">Custom service…</option>
                  </select>
                </div>

                {service === "custom" && (
                  <div>
                    <label style={{ fontSize: "13px" }}>Custom service</label>
                    <input
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      placeholder="e.g. Airbnb turnaround"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                      }}
                    />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: "13px" }}>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px" }}>Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px" }}>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      background: "white",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px" }}>Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Address, parking info, gate code, special requests..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "8px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    padding: "12px 18px",
                    background: "#2563EB",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {editingId ? "Save changes" : "Submit booking"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: "12px 18px",
                      background: "#E5E7EB",
                      color: "#111827",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Cancel edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Bookings list card (full width) */}
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
                No bookings yet. Add one using the form above.
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
                        Status
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #E5E7EB",
                          padding: "8px",
                          minWidth: "160px",
                        }}
                      >
                        Notes
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
                            type="button"
                            onClick={() => handleToggleStatus(b)}
                            style={{
                              background: "transparent",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            <span style={statusBadgeStyle(b.status || "Pending")}>
                              {b.status || "Pending"}
                            </span>
                          </button>
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {b.notes || (
                            <span style={{ color: "#9CA3AF" }}>No notes</span>
                          )}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #F3F4F6",
                            padding: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "6px",
                              flexWrap: "wrap",
                            }}
                          >
                            <button
                              onClick={() => handleEdit(b)}
                              style={{
                                padding: "6px 10px",
                                background: "#E5E7EB",
                                color: "#111827",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Edit
                            </button>
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
                          </div>
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
