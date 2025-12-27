import {
  FileText,
  CirclePlus,
  FilePenLine,
  Search,
  Trash2,
} from "lucide-react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { useEffect, useState } from "react";
import PopUp from "../component/PopUp";
import Footer from "../component/Footer";
let bookData = [
  {
    id: 1,
    name: "Java Programming",
    type: "Programming",
    language: "English",
    author: "James Gosling",
    publication: "Sun Microsystems",
    price: "Rs. 500",
    date: new Date().toLocaleString(),
    status: "Available",
  },
];
const Books = () => {
  const [books, setBooks] = useState(()=>{
    return JSON.parse(localStorage.getItem("books"))|| bookData;
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const [num, setNum] = useState(() => {
  const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
  return savedBooks.length ? Math.max(...savedBooks.map(b => b.id)) + 1 : 2;
});
  const [form, setForm] = useState({
    name: "",
    type: "",
    author: "",
    language: "",
    publication: "",
    price: "",
    date: "",
  });

  useEffect(()=>{
    localStorage.setItem("books", JSON.stringify(books));
  },[books]);

  const openPopUp = (type, book = null) => {
    setMode(type);
    setData(book);

    if(type === "edit" && book){
      setForm({
        name: book.name,
      type: book.type,
      author: book.author,
      publication: book.publication,
      language: book.language,
      price: book.price,
      });

    }else{
      setForm({
        name: "",
      type: "",
      author: "",
      publication: "",
      language: "",
      price: "",
      })
    }
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
    setMode("");
  };
  const filterBook = books.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase())||
      b.id.toString().includes(search)
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = (e) => {
    e.preventDefault();

    const newBook = {
      id: num,
      name: form.name,
      type: form.type,
      author: form.author,
      language: form.language,
      publication: form.publication,
      price: form.price,
      date: new Date().toLocaleString(),
      status: "Available",
    };

    setNum(num + 1);
    setBooks([...books, newBook]);
    closePopUp();
  };

  const editBook = (e) => {
    e.preventDefault();

    const update = books.map((b) =>
      b.id === data.id
        ? {
            ...b,
            name: form.name,
            type: form.type,
            author: form.author,
            publication: form.publication,
            language: form.language,
            price: form.price,
          }
        : b
    );

    setBooks(update);
    closePopUp()
  };

  const deleteBook = () => {
    setBooks(books.filter((b) => b.id !== data.id));
    closePopUp();
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-row md:flex-row">
        <Nav />

        <div className="flex-1 p-4 md:p-6">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row bg-gray-200 gap-3 md:gap-0 justify-between items-start md:items-center p-4 rounded-lg mb-4">
            <h1 className="font-semibold text-xl md:text-2xl">
              Book Management
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Add Book */}
              <button
                onClick={() => openPopUp("add")}
                className="flex gap-2 cursor-pointer justify-center items-center bg-black text-white px-4 py-2 rounded-lg shadow active:scale-95 w-full sm:w-auto"
              >
                <CirclePlus className="bg-white text-black rounded-full p-1" />
                Add Book
              </button>

              {/* Search */}
              <div className="flex gap-2 bg-white px-3 py-2 rounded-lg shadow items-center w-full sm:w-auto">
                <Search className="text-gray-500" />
                <input required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search by Name or ID or Type"
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
                  <th className="p-3 text-left hidden md:table-cell">Type</th>
                  <th className="p-3 text-left hidden lg:table-cell">Author</th>
                  <th className="p-3 text-left hidden md:table-cell">
                    Language
                  </th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filterBook.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{b.id}</td>
                    <td className="p-3 font-medium">{b.name}</td>

                    <td className="p-3 hidden md:table-cell">{b.type}</td>

                    <td className="p-3 hidden lg:table-cell">{b.author}</td>

                    <td className="p-3 hidden md:table-cell">{b.language}</td>

                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm">
                        {b.status}
                      </span>
                    </td>

                    <td className="p-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => openPopUp("edit", b)}
                        title="Edit"
                        className="text-blue-600 cursor-pointer  hover:scale-110"
                      >
                        <FilePenLine size={18} />
                      </button>
                      <button
                        onClick={() => openPopUp("delete", b)}
                        title="Delete"
                        className="text-red-600 cursor-pointer  hover:scale-110"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => openPopUp("view", b)}
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
        <PopUp title="Book Details" onclose={closePopUp}>
          {mode === "view" && (
            <>
              <p>
                ID: <b>{data?.id}</b>{" "}
              </p>
              <p>
                Name: <b>{data?.name}</b>{" "}
              </p>
              <p>
                Type: <b>{data?.type}</b>{" "}
              </p>
              <p>
                Author: <b>{data?.author}</b>{" "}
              </p>
              <p>
                Publication: <b>{data?.publication}</b>{" "}
              </p>
              <p>
                Language: <b>{data?.language}</b>{" "}
              </p>
              <p>
                Price: <b>{data?.price}</b>{" "}
              </p>
              <p>
                Date: <b>{data?.date}</b>{" "}
              </p>
              <p>
                Status: <b>{data?.status}</b>{" "}
              </p>
            </>
          )}

          {(mode === "edit" || mode==="add") && (
            <>
              <form
                onSubmit={mode==="add"? addBook: editBook }
                action=""
                className="p-2 rounded-xl shadow bg-gray-100 gap-2 grid justify-center "
              >
                <div className="grid justify-start text-lg font-semibold">
                  <label htmlFor="">Book name :</label>
                  <input required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="C-Programming"
                    className="border rounded-lg outline-none hover:border-gray-600 p-1"
                  />
                </div>
                <div className="grid justify-start text-lg font-semibold">
                  <label htmlFor="">Book Type :</label>
                  <input required
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    type="text"
                    placeholder="Programming"
                    className="border rounded-lg outline-none hover:border-gray-600 p-1"
                  />
                </div>

                <div className="grid gap-1 justify-start text-lg font-semibold">
                  <label htmlFor="">Author :</label>
                  <input required
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    type="text"
                    placeholder="Sumit Bhujel"
                    className="border rounded-lg outline-none hover:border-gray-600 p-1"
                  />
                </div>

                <div className="grid gap-1 justify-start text-lg font-semibold">
                  <label htmlFor="">Publication :</label>
                  <input required
                    name="publication"
                    value={form.publication}
                    onChange={handleChange}
                    type="text"
                    placeholder="Asmita publication"
                    className="border rounded-lg outline-none hover:border-gray-600 p-1"
                  />
                </div>

                <div className="grid gap-1 justify-start text-lg font-semibold">
                  <label htmlFor="">Language :</label>
                  <input required
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    type="text"
                    placeholder="English"
                    className="border rounded-lg outline-none hover:border-gray-600 p-1"
                  />
                </div>

                <div className="grid gap-1 justify-start text-lg font-semibold">
                  <label htmlFor="">price :</label>
                  <input required
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    type="text"
                    placeholder="Rs,400"
                    className="border rounded-lg outline-none hover:border-gray-600 p-1"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={` text-xl font-mono mb-2 cursor-pointer justify-center items-center text-white px-4 py-2 rounded-lg shadow active:scale-95 w-full sm:w-auto ${mode=== "add"? "bg-green-600":"bg-blue-600"}`}
                  >
                   {mode==="add"? "Add": "Update"}
                  </button>
                </div>
              </form>
            </>
          )}
          {mode === "delete" && (
            <>
              <p className="m-5">
                Are you sure you want to delete <b>{data?.name}</b>?
              </p>
              <div className=" flex justify-center px-2">
                <button
                  className=" text-xl font-mono mb-2 cursor-pointer justify-center items-center active:bg-red-400 bg-red-700 text-white px-4 py-2 rounded-lg shadow active:scale-95 w-full sm:w-auto"
                  onClick={deleteBook}
                >
                  Delete
                </button>
              </div>
            </>
          )}
          
        </PopUp>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Books;
