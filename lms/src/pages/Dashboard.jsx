import React from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import Card from "../component/Card";
import Footer from "../component/Footer";

const cardData=[
   { title: "Total Books", value: 1200, color: "text-blue-700" },
  { title: "Total Members", value: 120, color: "text-blue-700" },
  { title: "Issued Books", value: 100, color: "text-orange-600" },
  { title: "Available Books", value: 1100, color: "text-green-600" },

]

const recent=[
  { id: "B101", name: "Java Programming", member: "Argin Bhujel", issueDate: "2082-08-25", returnDate: "2082-09-12" },
    { id: "B102", name: "Java Script", member: "Manish Dhakal", issueDate: "2082-08-27", returnDate: "2082-09-10" },
    { id: "B103", name: "React JS ", member: "Shrinkhala Dhakal", issueDate: "2082-08-28", returnDate: "2082-09-15" },
 
]
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Header />

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <Nav/>
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {
              cardData.map((data,idx)=>(
                <Card key={idx} title={data.title} value={data.value} color={data.color} />
            
              ))
            }
            </section>

          {/* Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Recently Issued Books
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Book ID</th>
                    <th className="p-3 text-left">Book Name</th>
                    <th className="p-3 text-left">Member</th>
                    <th className="p-3 text-left">Issue Date</th>
                    <th className="p-3 text-left">Return Date</th>
                  </tr>
                </thead>
                <tbody>
                 {recent.map((i,idx)=>(
                   <tr key={idx} className="border-t hover:bg-gray-100">
                    <td className="p-3">{i.id}</td>
                    <td className="p-3">{i.name}</td>
                    <td className="p-3">{i.member}</td>
                    <td className="p-3">{i.issueDate}</td>
                    <td className="p-3">{i.returnDate}</td>
                  </tr>
                 ))}
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
