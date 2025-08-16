import React from "react";
import ProductList from "../components/ProductList";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <ProductList />
    </div>
  );
}

export default Home;
