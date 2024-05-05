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

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/account/:id`} element={<Account />} />
            <Route path="/specialist/:id" element={<Specialist />} />
            <Route path="/stocks" element={ <Stocks />} />
            <Route path="/history" element={ <History />} />
            <Route path="/order-card" element={ <OrderCard />} />
            <Route path="/collective" element={ <Collective />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/service-therapy/:id" element={<ServiceTherapy />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/question-answer" element={<FAQPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
