// Stocks.js

import React, { useState } from "react";
import { stocksList } from "../helpers/stocksList";
import StocksAll from "../components/stocks/StocksAll";
import "../styles/style-stocks.css";

const Stocks = () => {
  const itemsPerPage = 2; 
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStocks = stocksList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="main">
      <section className="stocks">
        <div className="container">
          <div className="stocks__inner">
            <h1 className="stocks__title">Новости и акции</h1>
            <div className="stocks__list">
              {currentStocks.map((project) => (
                <StocksAll
                  key={project.id}
                  title={project.title}
                  img={project.img}
                  text={project.text}
                  date={project.date}
                />
              ))}         
            <div className="pagination">
              {Array.from({ length: Math.ceil(stocksList.length / itemsPerPage) }).map((_, index) => (
                <button 
                  className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                  key={index} 
                  onClick={() => handlePageChange(index + 1)}>{index + 1}
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Stocks;
