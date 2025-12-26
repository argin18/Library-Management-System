import React, { useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { Search, SquareChartGantt } from "lucide-react";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";
import NepaliDate from "nepali-date-converter";


const issueData = [
  {
    bookid: 1,
    userId: "1",
    books: 2,
    dueDate: "2082-09-15",
    issuedAt: "2082-08-20",
    issueTime:"11:35 AM",
    detail: "Total 2 books were issued during the selected period.",
  },
];
const Issue = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("issued");


const todayBS = new NepaliDate(new Date()).format("YYYY-MM-DD");


  const openPopUp = (issue) => {
    setData(issue);
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
  };

  const isOverdue = (d) => {
    const today = new Date();
    today.setHours(0,0,0,0)

    const due = new NepaliDate(d).toJsDate();
    due.setHours(0,0,0,0)

    return today > due;
  };

  const filteredData = issueData.filter((item) => {
    const match =
      item.userId.toLowerCase().includes(search.toLowerCase()) ||
      item.bookid.toString().includes(search);

    if (tab === "overdue") {
      return match && isOverdue(item.dueDate);
    }
    return match;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <Nav />

        <div className="flex-1 p-6">
          {/* Top Bar */}
          <div className="flex bg-gray-200 justify-between items-center p-4 rounded-lg mb-4">
            {/* Tabs */}
            <div className="flex gap-3">
              <button
                onClick={() => setTab("issued")}
                className={`px-4 py-2 cursor-pointer active:scale-95 active:bg-blue-500 rounded-lg shadow ${
                  tab === "issued"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Issued Books
              </button>
              <button
                onClick={() => setTab("overdue")}
                className={`px-4 py-2 cursor-pointer active:scale-95 active:bg-red-500 rounded-lg shadow ${
                  tab === "overdue"
                    ? "bg-red-700 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Overdue Books
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
              <Search className="text-gray-500 cursor-pointer " />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by User ID or Book"
                className="outline-none text-sm"
              />
            </div>
          </div>

              <p className="text-sm text-gray-600 mb-3">
            Today (BS): <b>{todayBS}</b>
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Book ID</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Books Issued</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Issued Date & Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((i) => (
                  <tr key={i.bookid} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i.bookid}</td>
                    <td className="p-3">{i.userId}</td>
                    <td className="p-3">{i.books}</td>
                    <td className="p-3">{i.dueDate}</td>
                    <td className="p-3">{i.issuedAt} {i.issueTime}</td>
                    <td className="p-3">
                      {isOverdue(i.dueDate) ? (
                        <span className="text-red-600 font-semibold">
                          Overdue
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          Issued
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openPopUp(i)}
                        title="View Details"
                        className="text-green-600  cursor-pointer  hover:scale-110"
                      >
                        <SquareChartGantt />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No record Found
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
        <PopUp title="Issue Books Details" onclose={closePopUp}>
          <p>
            Book ID: <b>{data?.bookid}</b>{" "}
          </p>
          <p>
            User ID: <b>{data?.userId}</b>{" "}
          </p>
          <p>
            Details: <b>{data?.detail}</b>{" "}
          </p>
          <p>
            Books: <b>{data?.books}</b>{" "}
          </p>
          <p>
            Due Date: <b>{data?.dueDate}</b>{" "}
          </p>
          <p>
            Issue Date: <b>{data?.issuedAt}</b>{" "}
          </p>
        </PopUp>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Issue;
