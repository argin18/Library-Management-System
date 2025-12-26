import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Member from "./pages/Member";
import Issue from "./pages/Issue";
import Return from "./pages/Return";
import Report from "./pages/Report";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/member" element={<Member />}></Route>
        <Route path="/issue" element={<Issue />}></Route>
        <Route path="/return" element={<Return />}></Route>
        <Route path="/report" element={<Report />}></Route>
      </Routes>
      {/* </> */}

      {/* </> */}
      {/* </> */}
      {/* </> */}
      {/* </> */}
      {/* </> */}
    </div>
  );
};

export default App;
