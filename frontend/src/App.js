import "./styles/style.css";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";

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
import ServiceTherapy from "./pages/services/ServiceTherapy";
import Specialist from "./pages/Specialist";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import FAQPage from "./pages/FAQPage";
import OrderServices from "./pages/OrderServices";
import PasswordReset from "./pages/PasswordReset";
import MedicalCard from "./pages/MedicalCard";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/:slug" element={<Account />} />
            <Route path="/specialist/:slug" element={<Specialist />} />
            <Route path="/stocks" element={ <Stocks />} />
            <Route path="/history" element={ <History />} />
            <Route path="/order-card" element={ <OrderCard />} />
            <Route path="/collective" element={ <Collective />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/service-therapy/:slug" element={<ServiceTherapy />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/question-answer" element={<FAQPage />} />
            <Route path="/order-services" element={<OrderServices />} />
            <Route path="/password-reset" element={<PasswordReset/>} /> 
            <Route path="/medical-card/:slug" element={<MedicalCard/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
