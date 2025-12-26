import React, { useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { Search, SquareChartGantt, X } from "lucide-react";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";

const Issue = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const openPopUp = (issue) => {
    setData(issue);
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
  };

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
              <button className="bg-blue-700 cursor-pointer  text-white px-4 py-2 rounded-lg shadow font-medium">
                Issued Books
              </button>
              <button className="bg-gray-300 cursor-pointer  text-black px-4 py-2 rounded-lg shadow hover:bg-gray-400">
                Overdue Books
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
              <Search className="text-gray-500 cursor-pointer " />
              <input
                type="text"
                placeholder="Search by User ID or Book"
                className="outline-none text-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Books Issued</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Issued Date & Time</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">1</td>
                  <td className="p-3">U101</td>
                  <td className="p-3">2</td>
                  <td className="p-3">10-09-2082</td>
                  <td className="p-3">20-08-2082 11:35 AM</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        openPopUp({
                          id: "1",
                          userId: "U101",
                          detail:
                            "Total 2 books were issued during the selected period.",
                        })
                      }
                      title="View Details"
                      className="text-green-600  cursor-pointer  hover:scale-110"
                    >
                      <SquareChartGantt />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* pop up */}
      {open && (
        <PopUp title="Issue Books Details" onclose={closePopUp}>
          <p>
            ID: <b>{data?.id}</b>{" "}
          </p>
          <p>
            User ID: <b>{data?.userId}</b>{" "}
          </p>
          <p>
            Details: <b>{data?.detail}</b>{" "}
          </p>
        </PopUp>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Issue;
