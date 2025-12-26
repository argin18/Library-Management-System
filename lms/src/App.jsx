import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Member from "./pages/Member";
import Issue from "./pages/Issue";
import Return from "./pages/Return";
import Report from "./pages/Report";
import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const {isLogin}=useAuth()

  return (
    <div className="bg-gray-200">
      
        <Routes>
        <Route path="/startPage/*" element={<StartPage  />}></Route>

      {isLogin ?(
        <>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/member" element={<Member />}></Route>
        <Route path="/issue" element={<Issue />}></Route>
        <Route path="/return" element={<Return />}></Route>
        <Route path="/report" element={<Report />}></Route>
        </>
      ):(
        <Route path="*" element={<Navigate to="/startPage/login"/>}/>
      )}
      </Routes>
    </div>
  );
};

export default App;
