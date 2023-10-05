import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
// pages
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { DetailsPage } from "./pages/Details";
// components
import { MyNavBar } from "./components/Navbar";
import { AddListing } from "./pages/Listing";

function App() {
  return (
   <div>
    <MyNavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/book/addNew" element={<AddListing/>}/>
      <Route path="/book/view/:bookId" element={<DetailsPage/>}/>
   </Routes>
   </div>
  );
}

export default App;
