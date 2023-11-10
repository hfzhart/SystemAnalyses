import React from "react";
import Header from "../Header";
import Footer from "../Footer/foter";
import './StartPage.css'

function StartPage() {
  return (
    <div className="start-page-container">
      <Header />
      <div className="content-container">
        <h1>Welcome to start page!</h1>
      </div>
      <Footer />
    </div>
  );
}

export default StartPage;
