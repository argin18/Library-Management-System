import React, {  useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { Search, RotateCcw } from "lucide-react";
import Footer from "../component/Footer";
import PopUp from "../component/PopUp";
import NepaliDate from "nepali-date-converter";


const Return = () => {
  const todayBS = new NepaliDate(new Date()).format("YYYY-MM-DD");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [returnList, setReturnList] = useState(()=>{
    try{
    const stored = JSON.parse(localStorage.getItem("issues"));
    return stored ? stored : [];
    }catch{
      return []
    }
  })


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
      i.bookid.toString().includes(search) ||
      i.id.toString().includes(search)
  );

  const confirm = () => {
  if (!data) return;
let dailyReports = JSON.parse(localStorage.getItem("reports")) || [];

  // Remove issue
  const updatedIssues = returnList.filter((i) => i.id !== data.id);
  setReturnList(updatedIssues);
  localStorage.setItem("issues", JSON.stringify(updatedIssues));

  // Update book status to Available
  const allBooks = JSON.parse(localStorage.getItem("books")) || [];
  const updatedBooks = allBooks.map((b) =>
    b.id === data.bookid ? { ...b, status: "Available" } : b
  );
  localStorage.setItem("books", JSON.stringify(updatedBooks));
// retort section
  let todayReport = dailyReports.find((r) => r.date === todayBS && r.type === "Returned Books");

if (todayReport) {
  todayReport.value += Number(data.books || 1); // increment returned books
  todayReport.detail = `Total ${todayReport.value} books were returned today.`;
} else {
  dailyReports.push({
    id: Date.now(),
    type: "Returned Books",
    description: "Books returned today",
    date: todayBS,
    value: Number(data.books || 1),
     detail: `Total ${data.books || 1} book${data.books > 1 ? "s" : ""} were returned today.`
  });
}

localStorage.setItem("reports", JSON.stringify(dailyReports));

  // Close popup
  setOpen(false);
  setData(null);

  // Trigger Dashboard update
  window.dispatchEvent(new Event("localStorageUpdate"));
};


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
                  <tr key={i.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i.id}</td>
                    <td className="p-3">{i.userId}</td>
                    <td className="p-3">{i.bookid}</td>
                    <td className="p-3">{i.issuedAt}</td>
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
            Issue ID: <b>{data.id}</b>
          </p>
          <p>
            User ID: <b>{data.userId}</b>
          </p>
          <p>
            Book ID: <b>{data.bookid}</b>
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
