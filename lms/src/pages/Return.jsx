import React, { useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { Search, RotateCcw } from "lucide-react";
import Footer from "../component/Footer";
import PopUp from "../component/PopUp";
import NepaliDate from "nepali-date-converter";

const returnData = [
  {
    issueId: "I101",
    userId: "U201",
    bookId: "B301",
    issueDate: "2082-08-20",
    dueDate: "2082-09-12",
  },
];

const Return = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [returnList, setReturnList] = useState(returnData)

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
    today.setHours(0, 0, 0, 0);

    const due = new NepaliDate(d).toJsDate();
    due.setHours(0, 0, 0, 0);

    return today > due;
  };
  
  const filteredData = returnList.filter(
    (i) =>
      i.userId.toLowerCase().includes(search.toLowerCase()) ||
      i.bookId.toLowerCase().includes(search.toLowerCase()) ||
      i.issueId.toLowerCase().includes(search.toLowerCase())
  );

  const confirm=()=>{
    if(data){
      setReturnList(returnList.filter(i=>i.issueId !== data.issueId));
      setOpen(false)
    setData(null)
    }
  }

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((i) => (
                  <tr key={i.issueId} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i.issueId}</td>
                    <td className="p-3">{i.userId}</td>
                    <td className="p-3">{i.bookId}</td>
                    <td className="p-3">{i.issueDate}</td>
                    <td className="p-3">{i.dueDate}</td>
                    <td className="p-3">
                      {isOverdue(i.dueDate) ? (
                        <p className="text-red-600 font-semibold">
                          Overdue
                        </p>
                      ) : (
                        <p className="text-green-600 font-semibold">
                          On Time
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openPopUp(i)}
                        title="Return Book"
                        className="flex gap-2 cursor-pointer  items-center bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 active:scale-95"
                      >
                        <RotateCcw size={18} />
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No records found
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
        <PopUp title="Confirm Book Return" onclose={closePopUp}>
          <p>
            Issue ID: <b>{data.issueId}</b>
          </p>
          <p>
            User ID: <b>{data.userId}</b>
          </p>
          <p>
            Book ID: <b>{data.bookId}</b>
          </p>
          <p>
            Due Date: <b>{data.dueDate}</b>
          </p>
          <button
            onClick={confirm}
            className="mt-4 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Confirm Return
          </button>
        </PopUp>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Return;
