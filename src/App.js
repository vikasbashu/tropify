import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
// pages
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";

function App() {
  return (
   <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
   </Routes>
  );
}

export default App;
