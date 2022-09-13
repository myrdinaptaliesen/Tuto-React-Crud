import React from "react";
import Menu from "../components/Layouts/Menu";

const Home = () => {
  return (
    <div>
      <Menu />
      <div>
        <p>{localStorage.access_token}</p>
      </div>
    </div>
  );
};

export default Home;
