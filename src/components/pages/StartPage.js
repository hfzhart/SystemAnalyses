import React from "react";
import Header from "../Header";
import Footer from "../Footer/foter";
import './StartPage.css'

function StartPage() {
  return (
    <div className="start-page-container">
      <Header />
      <div className="content-container">
        <h1>Welcome to start page!
          Тест Тест</h1>     
      </div>
      {/* <div className="LineChart">
        <MyLineChart/>   
      </div> */}
      <div className="">
        <MyLineChart/>   
      </div>
      <div className="">
        <MyLineChart/>   
      </div>
      <div className="">
        <MyLineChart/>   
      </div>
      <div className="">
        <MyLineChart/>   
      </div>
      <div className="">
        <MyLineChart/>   
      </div>
      <div className="spacer"></div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

export default StartPage;
