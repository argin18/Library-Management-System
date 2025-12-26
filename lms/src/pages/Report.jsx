import React, { useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { CalendarDays, FileText, X } from "lucide-react";
import Card from "../component/Card";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";

const Report = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const openPopUp = (report) => {
    setData(report);
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
          {/* date */}
          <div className="flex bg-gray-200 justify-between items-center p-4 rounded-lg mb-6">
            <h1 className="text-2xl font-semibold">Reports</h1>

            <div className="flex gap-3 items-center">
              <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
                <CalendarDays className="text-gray-500" />
                <input type="date" className="outline-none text-sm" />
              </div>
              <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
                <CalendarDays className="text-gray-500" />
                <input type="date" className="outline-none text-sm" />
              </div>
            </div>
          </div>

          {/*  Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <Card title="Total Books" value="1200" color="text-blue-700" />
            <Card title="Issued Books" value="180" color="text-orange-600" />
            <Card title="Returned Books" value="150" color="text-green-600" />
          </div>

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
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">R101</td>
                  <td className="p-3">Issued Books</td>
                  <td className="p-3">List of issued books</td>
                  <td className="p-3">2025-08-20</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        openPopUp({
                          id: "R101",
                          type: "Issued Books",
                          detail:
                            "Total 180 books were issued during the selected period.",
                        })
                      }
                      className="flex gap-2 cursor-pointer  items-center text-blue-600 hover:underline"
                    >
                      <FileText size={18} /> View
                    </button>
                  </td>
                </tr>

                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">R102</td>
                  <td className="p-3">Returned Books</td>
                  <td className="p-3">List of returned books</td>
                  <td className="p-3">2025-08-20</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        openPopUp({
                          id: "R102",
                          type: "Returned Books",
                          detail: "150 books were returned successfully.",
                        })
                      }
                      className="flex gap-2  cursor-pointer  items-center text-blue-600 hover:underline"
                    >
                      <FileText size={18} /> View
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
