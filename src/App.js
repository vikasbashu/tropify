import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
   <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/login" element={<h1>LoginPage</h1>}/>
   </Routes>
  );
}

export default App;
