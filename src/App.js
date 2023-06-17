import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AddIncident from './components/AddIncident';
import Navbar from './components/Navbar';
import AddUser from './components/AddUser';

function App() {
  return (
    <BrowserRouter>
    <div>
    <Navbar />
    <div >
      <Routes>
        <Route  exact path="/" element={<Home />}/>
        <Route exact path="/addIncident" element={<AddIncident />}  />
        <Route exact path="/addUser" element={<AddUser />}  />
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
