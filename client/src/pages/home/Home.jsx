import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Header from "../../components/header/Header";
import "./home.css";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";

function Home() {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
      </div>
    </div>
  );
}

export default Home;
