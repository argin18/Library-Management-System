import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const {setIsLogin}=useAuth()
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [logOut, setLogOut] = useState(false)

  const navigate=useNavigate();

  const  confirm=()=>{
    
    setIsLogin(false)
    setLogOut(false)
    navigate("/startPage/login")

  }


  const openPopUp = (profile) => {
    setData(profile);
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
    setData(null);
  };
  return (
    <>
      <header className="bg-white fixed top-0 left-0 w-full z-50 shadow text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hamro Library</h1>
        <ul className="flex gap-6 text-lg">
          <li className="cursor-pointer hover:underline">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <span
              onClick={() =>
                openPopUp({
                  name: "Argin Bhujel",
                  email: "argin@gmail.com",
                  phone: "9810466236",
                  address: "Chatara",
                })
              }
              className="profile"
            >
              Profile
            </span>
          </li>
          <li 
          onClick={()=>setLogOut(true)}
           className="cursor-pointer hover:underline">
           Logout
          </li>
        </ul>
      </header>
      {logOut && (
        <PopUp title="Confirm Logout" onclose={()=>setLogOut(false)}>
          <p>
           Are you sure you want to log Out ?
          </p>
         <div className="flex justify-end gap-4">
          <button
        onClick={() => setLogOut(false)}
        className="cursor-pointer px-4 py-2 bg-gray-300 rounded"
      >
        Cancel
      </button>

      <button
        onClick={confirm}
        className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
         </div>
        </PopUp>
      )}
      {open && (
        <PopUp title="Librarien Detail" onclose={closePopUp}>

          <p>
            User Name: <b>{data?.name}</b>{" "}
          </p>
          <p>
            Email: <b>{data?.email}</b>{" "}
          </p>
          <p>
            Phone: <b>{data?.phone}</b>{" "}
          </p>
        </PopUp>
      )}
    </>
  );
};

export default Header;
