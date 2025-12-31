import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import {
  FileText,
  CirclePlus,
  FilePenLine,
  Search,
  Trash2,
} from "lucide-react";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";

let memberData = [
  {
    id: 1,
    name: "Argin Bhujel",
    address: "Chatara",
    email: "arginbhujel@gmail.com",
    phone: "9800000000",
    date: new Date().toLocaleString(),
  },
];
const Member = () => {
  const [members, setMember] = useState(() => {
    return JSON.parse(localStorage.getItem("members")) || memberData;
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const [num, setNum] = useState(() => {
    const savedMembers = JSON.parse(localStorage.getItem("members")) || [];
    return savedMembers.length
      ? Math.max(...savedMembers.map((m) => m.id)) + 1
      : 2;
  });

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const openPopUp = (type, member = null) => {
    setMode(type);
    setData(member);

    if (type === "edit" && member) {
      setForm({
        name: member.name,
        address: member.address,
        email: member.email,
        phone: member.phone,
      });
    } else {
      setForm({
        name: "",
        address: "",
        email: "",
        phone: "",
        date: "",
      });
    }
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
    setMode("");
  };

  const filterMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toString().includes(search)
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMember = (e) => {
    e.preventDefault();

    const newMember = {
      id: num,
      name: form.name,
      address: form.address,
      email: form.email,
      phone: form.phone,
      date: new Date().toLocaleString(),
    };

    setNum(num + 1);
    setMember([...members, newMember]);
    closePopUp();
  };

  const editMember = (e) => {
    e.preventDefault(e);

    const update = members.map((b) =>
      b.id === data.id
        ? {
            ...b,
            name: form.name,
            address: form.address,
            email: form.email,
            phone: form.phone,
          }
        : b
    );

    setMember(update);
    closePopUp();
  };

  const deleteMember = () => {
    setMember(members.filter((m) => m.id !== data.id));
    closePopUp();
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <div className="flex pt-17 flex-row md:flex-row">
          <Nav />

          <div className="flex-1 p-4 md:p-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row bg-gray-200 gap-3 md:gap-0 justify-between items-start md:items-center p-4 rounded-lg mb-4">
              <h1 className="font-semibold text-xl md:text-2xl">
                User Management
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Add User */}
                <button
                  onClick={() => openPopUp("add")}
                  className="flex gap-2  cursor-pointer justify-center items-center bg-black text-white px-4 py-2 rounded-lg shadow active:scale-95 w-full sm:w-auto"
                >
                  <CirclePlus className="bg-white text-black rounded-full p-1" />
                  Add User
                </button>

                {/* Search */}
                <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center w-full sm:w-auto">
                  <Search className="text-gray-500" />
                  <input
                    required
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search by Name or ID"
                    className="outline-none text-sm w-full"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full bg-white rounded-lg shadow text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left hidden md:table-cell">
                      Email
                    </th>
                    <th className="p-3 text-left ">Phone</th>
                    <th className="p-3 text-left hidden md:table-cell">
                      Address
                    </th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filterMembers.map((m) => (
                    <tr key={m.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{m.id}</td>
                      <td className="p-3 font-medium">{m.name}</td>

                      <td className="p-3 hidden md:table-cell">{m.email}</td>

                      <td className="p-3  lg:table-cell">{m.phone}</td>

                      <td className="p-3 hidden md:table-cell">{m.address}</td>

                      <td className="p-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => openPopUp("edit", m)}
                          title="Edit"
                          className="text-blue-600 cursor-pointer  hover:scale-110"
                        >
                          <FilePenLine size={18} />
                        </button>
                        <button
                          onClick={() => openPopUp("delete", m)}
                          title="Delete"
                          className="text-red-600 cursor-pointer  hover:scale-110"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => openPopUp("view", m)}
                          title="View"
                          className="text-green-600 cursor-pointer  hover:scale-110"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* pop up */}
        {open && (
          <PopUp title="Member Details" onclose={closePopUp}>
            {mode === "view" && (
              <>
                <p>
                  ID: <b>{data?.id}</b>{" "}
                </p>
                <p>
                  Name: <b>{data?.name}</b>{" "}
                </p>
                <p>
                  Email: <b>{data?.email}</b>{" "}
                </p>
                <p>
                  Phone: <b>{data?.phone}</b>{" "}
                </p>
                <p>
                  Address: <b>{data?.address}</b>{" "}
                </p>
                <p>
                  Date: <b>{data?.date}</b>{" "}
                </p>
              </>
            )}

            {mode === "delete" && (
              <>
                <p className="m-5">
                  Are you sure you want to delete <b>{data?.name}</b> ?
                </p>
                <div className=" flex justify-center px-2">
                  <button
                    className=" text-xl font-mono mb-2 cursor-pointer justify-center items-center active:bg-red-400 bg-red-700 text-white px-4 py-2 rounded-lg shadow active:scale-95 w-full sm:w-auto"
                    onClick={deleteMember}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
            {(mode === "add" || mode === "edit") && (
              <>
                <form
                  onSubmit={mode === "add" ? addMember : editMember}
                  action=""
                  className="p-2 rounded-xl shadow bg-gray-100 gap-2 grid justify-center "
                >
                  <div className="grid justify-start text-lg font-semibold">
                    <label htmlFor="">Member name :</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Sumit Bhujel"
                      className="border rounded-lg outline-none hover:border-gray-600 p-1"
                    />
                  </div>
                  <div className="grid justify-start text-lg font-semibold">
                    <label htmlFor="">Member Email :</label>
                    <input
                      required
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="argin@gmail.com"
                      className="border rounded-lg outline-none hover:border-gray-600 p-1"
                    />
                  </div>

                  <div className="grid gap-1 justify-start text-lg font-semibold">
                    <label htmlFor="">Phone Number:</label>
                    <input
                      required
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="text"
                      placeholder="9800000000"
                      className="border rounded-lg outline-none hover:border-gray-600 p-1"
                    />
                  </div>

                  <div className="grid gap-1 justify-start text-lg font-semibold">
                    <label htmlFor="">Address :</label>
                    <input
                      required
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      type="text"
                      placeholder="Chatara"
                      className="border rounded-lg outline-none hover:border-gray-600 p-1"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={` text-xl font-mono mb-2 cursor-pointer justify-center items-center  text-white px-4 py-2 rounded-lg shadow active:scale-95 w-full sm:w-auto ${mode==="add"?"bg-green-600":"bg-blue-600"}`}
                    >
                      {mode === "add" ? "Add" : "Update"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </PopUp>
        )}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Member;
