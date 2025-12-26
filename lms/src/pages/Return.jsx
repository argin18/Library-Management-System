import React from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { Search, RotateCcw } from "lucide-react";
import Footer from "../component/Footer";

const Return = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <Nav />

        <div className="flex-1 p-6">
          {/* Top Bar */}
          <div className="flex bg-gray-200 justify-between items-center p-4 rounded-lg mb-4">
            <h1 className="text-2xl font-semibold">Return Books</h1>

            {/* Search */}
            <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center">
              <Search className="text-gray-500 cursor-pointer " />
              <input
                type="text"
                placeholder="Search by User ID or Book ID"
                className="outline-none text-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Issue ID</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Book ID</th>
                  <th className="p-3 text-left">Issue Date</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">I101</td>
                  <td className="p-3">U201</td>
                  <td className="p-3">B301</td>
                  <td className="p-3">20-08-2082</td>
                  <td className="p-3">10-09-2082</td>
                  <td className="p-3">
                    <button
                      title="Return Book"
                      className="flex gap-2 cursor-pointer  items-center bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 active:scale-95"
                    >
                      <RotateCcw size={18} />
                      Return
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Return;
