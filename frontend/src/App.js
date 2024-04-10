import "./styles/style.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import OrderCard from "./pages/OrderCard";
import Order from "./pages/Order";
import History from "./pages/History";
import Collective from "./pages/Collective";
import Account from "./pages/Account";
import Stocks from "./pages/Stocks";
import Appointment from "./pages/Appointment";
import ServiceTherapy from "./pages/ServiceTherapy";
import Specialist from "./pages/Specialist";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/account/:id" element={<Account />} />
            </Route>
            <Route path="/specialist" element={<Specialist />} />
            <Route path="/stocks" element={ <Stocks />} />
            <Route path="/history" element={ <History />} />
            <Route path="/order-card" element={ <OrderCard />} />
            <Route path="/collective" element={ <Collective />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/service-therapy" element={<ServiceTherapy />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
  
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
