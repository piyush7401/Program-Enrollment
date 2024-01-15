import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./context/UserContextProvider";
import DashBoard from "./pages/DashBoard";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          {/* <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route> */}
          <Route path="/Register" element={<Register></Register>}></Route>
          <Route path="/DashBoard" element={<DashBoard></DashBoard>} ></Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;