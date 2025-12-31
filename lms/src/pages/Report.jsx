import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { CalendarDays, FileText, X } from "lucide-react";
import Card from "../component/Card";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";


const Report = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);
    const [returns, setReturns] = useState([]);
   
  const reportData = JSON.parse(localStorage.getItem("reports")) || [];
  
  useEffect(() => {
    const update = () => {
      const books = JSON.parse(localStorage.getItem("books")) || [];
      const returns = JSON.parse(localStorage.getItem("returns")) || [];
      const issues = JSON.parse(localStorage.getItem("issues")) || [];
  
      setBooks(books);
      setReturns(returns);
      setIssues(issues);
    };
  
    update();
  
    // Listen for changes from Issue/Return components
    window.addEventListener("localStorageUpdate", update);
  
    return () => {
      window.removeEventListener("localStorageUpdate", update);
    };
  }, []);

  const reportCard = [
    { title: "Total Books", value: books.length, color: "text-blue-700" },
    { title: "Issued Books", value: issues.length, color: "text-orange-600" },
    { title: "Returned Books", value: returns.length, color: "text-green-600" },
  ];

  const openPopUp = (report) => {
    setData(report);
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
  };

  const filter = reportData.filter((d) => {
   const dataDate = new Date(d.date + "T00:00:00");
  const start = starDate ? new Date(starDate + "T00:00:00") : null;
  const end = endDate ? new Date(endDate + "T23:59:59") : null;

  return (!start || dataDate >= start) && (!end || dataDate <= end);
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex pt-17">
        <Nav />

        <div className="flex-1 p-6">
          {/* date */}
          <div className="flex bg-gray-200 justify-between items-center p-4 rounded-lg mb-6">
            <h1 className="text-2xl font-semibold">Reports</h1>

            <div className="flex gap-3 items-center">
              <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
                <CalendarDays className="text-gray-500" />
                <input
                  value={starDate}
                  onChange={(e) => setStarDate(e.target.value)}
                  type="date"
                  className="outline-none text-sm"
                />
              </div>
              <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
                <CalendarDays className="text-gray-500" />
                <input
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  className="outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/*  Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {reportCard.map((c, idx) => (
              <Card key={idx} title={c.title} value={c.value} color={c.color} />
            ))}
          </div> */}

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {reportCard.map(card => (
              <Card key={card.title} {...card} />
            ))}
          </section>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Report ID</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filter.length ? (
                  filter.map((d) => (
                    <tr key={d.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{d.id}</td>
                      <td className="p-3">{d.type}</td>
                      <td className="p-3">{d.detail}</td>
                      <td className="p-3">{d.date}</td>
                      <td className="p-3">
                        <button
                          onClick={() => openPopUp(d)}
                          className="flex gap-2 cursor-pointer  items-center text-blue-600 hover:underline"
                        >
                          <FileText size={18} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No reports found for selected date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* pop up */}
      {open && (
        <PopUp title="Report Details" onclose={closePopUp}>
          <p>
            Report ID: <b>{data?.id}</b>
          </p>
          <p>
            Type: <b>{data?.type}</b>
          </p>
          <p>
            Details: <b>{data?.detail}</b>
          </p>
        </PopUp>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Report;
