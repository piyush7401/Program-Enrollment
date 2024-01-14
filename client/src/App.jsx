import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          {/* <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route> */}
          <Route path="/Register" element={<Register></Register>}></Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;