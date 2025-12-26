import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const {setIsLogin}=useAuth()
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const navigate=useNavigate();

  const  logOut=()=>{
    
    setIsLogin(false)
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
      <header className="bg-white shadow text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hamro Library</h1>
        <ul className="flex gap-6 text-lg">
          <li className="cursor-pointer hover:underline">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <span
              onClick={() =>
                openPopUp({
                  id: "1",
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
          onClick={logOut}
           className="cursor-pointer hover:underline">
           Logout
          </li>
        </ul>
      </header>
      {open && (
        <PopUp title="Librarien Detail" onclose={closePopUp}>
          <p>
            ID: <b>{data?.id}</b>{" "}
          </p>
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
