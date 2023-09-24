import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Header from "../../components/header/Header";
import "./home.css";
import Featured from "../../components/featured/Featured";

function Home() {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <Featured />
      </div>
    </div>
  );
}

export default Home;
