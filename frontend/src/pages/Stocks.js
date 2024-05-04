import {stocksList} from "../helpers/stocksList"
import StocksAll from "../components/stocks/StocksAll"

import "../styles/style-stocks.css";

const Stocks = () => {
  return (
    <main>
      <section className="stocks">
        <div className="container">
          <div className="stocks__inner">
            <h1 className="stocks__title">Новости и акции</h1>
            <div className="stocks__list">
                {stocksList.map((project) =>{
                  return <StocksAll key={project.id} title={project.title} img={project.img} text={project.text} date={project.date}/>
                })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Stocks;
