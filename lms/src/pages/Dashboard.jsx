import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import Card from "../component/Card";
import Footer from "../component/Footer";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);

  const [recentIssues, setRecentIssues] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);

  
  
  
 useEffect(() => {
  const update = () => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const members = JSON.parse(localStorage.getItem("members")) || [];
    const issues = JSON.parse(localStorage.getItem("issues")) || [];

    setBooks(books);
    setMembers(members);
    setIssues(issues);
    setRecentIssues(issues.slice(-5));
    setRecentMembers(members.slice(-5));
  };

  update();

  // Listen for changes from Issue/Return components
  window.addEventListener("localStorageUpdate", update);

  return () => {
    window.removeEventListener("localStorageUpdate", update);
  };
}, []);


  const cardData = [
    { title: "Total Books", value: books.length, color: "text-blue-700" },
    { title: "Total Members", value: members.length, color: "text-blue-700" },
    { title: "Issued Books", value: issues.length, color: "text-orange-600" },
    {
      title: "Available Books",
      value: books.filter(b => b.status === "Available").length,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <Nav />

        <main className="flex-1 p-6">
          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cardData.map(card => (
              <Card key={card.title} {...card} />
            ))}
          </section>

          {/* Recently Issued Books */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Recently Issued Books
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Book ID</th>
                    <th className="p-3 text-left">User ID</th>
                    <th className="p-3 text-left">Issue Date</th>
                    <th className="p-3 text-left">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIssues.length ? (
                    recentIssues.map(issue => (
                      <tr key={issue.bookid} className="border-t">
                        <td className="p-3">{issue.bookid}</td>
                        <td className="p-3">{issue.userId}</td>
                        <td className="p-3">{issue.issuedAt}</td>
                        <td className="p-3">{issue.dueDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-500">
                        No issued books found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recently Added Members */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Recently Added Members
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Member ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.length ? (
                    recentMembers.map(m => (
                      <tr key={m.id} className="border-t">
                        <td className="p-3">{m.id}</td>
                        <td className="p-3">{m.name}</td>
                        <td className="p-3">{m.email}</td>
                        <td className="p-3">{m.phone}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-500">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
