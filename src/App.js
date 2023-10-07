import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
// pages
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { DetailsPage } from "./pages/Details";
import { Orders } from "./pages/Orders";
// components
import { MyNavBar } from "./components/Navbar";
import { AddListing } from "./pages/Listing";
import { Profile } from "./pages/Profile";

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
      <Route path="/book/orders" element={<Orders/>}/>
      <Route path="/me" element={<Profile/>}/>
   </Routes>
   </div>
  );
}

export default App;
