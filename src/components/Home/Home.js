import React from "react";
import gameover from "../../img/source.gif";
function Home(props) {
  return (
    <div className="mt-2">
      <div className="imgcontainer">
        <img src={gameover} alt="gameover" className="gameover" />
      </div>
      <h1>
        <b>Conquer Money Login Success</b>
      </h1>
    </div>
  );
}

export default Home;
