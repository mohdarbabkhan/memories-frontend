import Login from "./components/login/Login.js";
import Home from "./container/Home.js";
import {Routes,Route} from "react-router-dom"


function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
