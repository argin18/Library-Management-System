import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { CirclePlus, Search, SquareChartGantt } from "lucide-react";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";
import NepaliDate from "nepali-date-converter";

const Issue = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("issued");
  const [form, setForm] = useState({
    bookid: "",
    userId: "",
    books: "",
    dueDate: "",
  });

  const [issues, setIssues] = useState(
    JSON.parse(localStorage.getItem("issues")) || [
      {
        bookid: 1,
        userId: "1",
        books: 2,
        dueDate: "2082-09-15",
        issuedAt: "2082-08-20",
        issueTime: "11:35 AM",
        detail: "Total 2 books were issued during the selected period.",
      },
    ]
  );
  useEffect(() => {
    localStorage.setItem("issues", JSON.stringify(issues));
  }, [issues]);

  const todayBS = new NepaliDate(new Date()).format("YYYY-MM-DD");

  //convert AD to Bs
  const toBS = (adDate) => {
    return new NepaliDate(new Date(adDate)).format("YYYY-MM-DD");
  };

  const openPopUp = (issue) => {
    if (issue === "add") {
      setMode("add");
      setData(null);
    } else {
      setMode("view");
      setData(issue);
    }
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isOverdue = (d) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const due = new NepaliDate(d).toJsDate();
      due.setHours(0, 0, 0, 0);

      return today > due;
    } catch (e) {
      return false;
    }
  };

  const handleAddIssue = (e) => {
    e.preventDefault();
    let dailyReports = JSON.parse(localStorage.getItem("reports")) || [];

    const newIssue = {
      id: Date.now(),
      ...form,
      bookid: Number(form.bookid),
      issuedAt: todayBS,
      issueTime: new Date().toLocaleTimeString(),
      detail: `Book issued to user ${form.userId}`,
    };

    // Save issue
    const updatedIssues = [...issues, newIssue];
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));

    // Update book status
    const allBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = allBooks.map((b) =>
      b.id === Number(form.bookid) ? { ...b, status: "Issued" } : b
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    // update daily report
    let todayReport = dailyReports.find(
      (r) => r.date === todayBS && r.type === "Issued Books"
    );

    if (todayReport) {
      todayReport.value += Number(form.books);
      todayReport.detail = `Total ${todayReport.value} books were issued today.`;
    } else {
      dailyReports.push({
        id: Date.now(),
        type: "Issued Books",
        description: "Books issued today",
        date: todayBS,
        value: Number(form.books),
        detail: `Total ${form.books} books were issued today.`,
      });
    }
    localStorage.setItem("reports", JSON.stringify(dailyReports));

    // Reset form and close popup
    setOpen(false);
    setForm({ bookid: "", userId: "", books: "", dueDate: "" });

    // Trigger Dashboard update
    window.dispatchEvent(new Event("localStorageUpdate"));
  };

  const filteredData = issues.filter((item) => {
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
                onClick={() => openPopUp("add")}
                className="flex gap-2 mr-3 cursor-pointer justify-center items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow active:scale-95 active:bg-red-400 w-full sm:w-auto"
              >
                <CirclePlus className="bg-white text-black rounded-full p-1" />
                Issue Book
              </button>
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
                  <tr key={i.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i.bookid}</td>
                    <td className="p-3">{i.userId}</td>
                    <td className="p-3">{i.books}</td>
                    <td className="p-3">{i.dueDate}</td>
                    <td className="p-3">
                      {i.issuedAt} {i.issueTime}
                    </td>
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
                    <td colSpan="7" className="text-center p-4 text-gray-500">
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
        <PopUp
          title={mode === "add" ? "Issue New Book" : "Issue Book Details"}
          onclose={closePopUp}
        >
          {mode === "view" && (
            <>
              <p>
                Book ID: <b>{data?.bookid}</b>
              </p>
              <p>
                User ID: <b>{data?.userId}</b>
              </p>
              <p>
                Books: <b>{data?.books}</b>
              </p>
              <p>
                Due Date: <b>{data?.dueDate}</b>
              </p>
              <p>
                Issued At:{" "}
                <b>
                  {data?.issuedAt} {data?.issueTime}
                </b>
              </p>
            </>
          )}

          {mode === "add" && (
            <form onSubmit={handleAddIssue} className="grid gap-3">
              <input
                name="bookid"
                value={form.bookid}
                onChange={handleChange}
                placeholder="Book ID"
                required
                className="border p-2 rounded"
              />

              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="User ID"
                required
                className="border p-2 rounded"
              />

              <input
                name="books"
                value={form.books}
                onChange={handleChange}
                placeholder="No of Books"
                required
                className="border p-2 rounded"
              />

              <input
                type="text"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                placeholder="YYYY-MM-DD (BS)"
                required
                className="border p-2 rounded"
              />

              <button className="bg-green-600 cursor-pointer text-white p-2 rounded">
                Issue Book
              </button>
            </form>
          )}
        </PopUp>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Issue;
