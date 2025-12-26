import React from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import Card from "../component/Card";
import Footer from "../component/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Header/>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <Nav/>
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* {[
              { title: "Total Books", value: 1200 },
              { title: "Total Members", value: 120 },
              { title: "Issued Books", value: 100 },
              { title: "Available Books", value: 1100 },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow"
              >
                <h4 className="text-blue-600 font-semibold">{item.title}</h4>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
            ))} */}
            <Card title="Total Books" value="1200" color="text-blue-700" />
            <Card title="Total menbers" value="120" color="text-blue-700" />
            <Card title="Issued Books" value="100" color="text-orange-600" />
            <Card title="Availble Books" value="1100" color="text-green-600" />
          </section>

          {/* Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Recently Issued Books
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-white-800">
                  <tr>
                    <th className="p-3 text-left">Book ID</th>
                    <th className="p-3 text-left">Book Name</th>
                    <th className="p-3 text-left">Member</th>
                    <th className="p-3 text-left">Issue Date</th>
                    <th className="p-3 text-left">Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-gray-100">
                    <td className="p-3">B101</td>
                    <td className="p-3">Java Programming</td>
                    <td className="p-3">Argin Bhuje</td>
                    <td className="p-3">2082-08-25</td>
                    <td className="p-3">2082-09-12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Dashboard;
