import { API_URL, API_REFRESH} from "../../constants/apiConstants.js";
import Cookie from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React, {useState, useEffect, useRef} from 'react';

var movement = false;
const Extendtoken = () =>{
  const [hasMovement,setMovement]= useState(false);
  var history = useHistory();
  const redir = () => {        
    Cookie.set("token", { expires: 0.0 });
    history.push("/"); //returns to login
  }
  const interval = useRef(null);
  useEffect(()=>{
    window.addEventListener("mousemove", setMovement);
    RefreshReq();
    return () => window.removeEventListener("mousemove", setMovement);
  }, [interval])

  const stopRefreshing = () =>
  {
      console.log("Stopping Refresh Interval...");
    clearInterval(interval.current);  
  }

  function RefreshReq(){
    console.log("Refresh Interval Called");
    interval.current = setInterval(() => {
      refreshT();
    }, 10000)
    return(null)
    }
    const refreshT = () =>
    {    
      console.log("refresh extend tests");
      console.log("movement: "+movement);
      if(movement)
      {
        console.log("attempting refresh!!");
        axios
        .post(API_URL + API_REFRESH, {
            movement: movement,  
            token: Cookie.get("token"),
        })
        .then((response) => {
          console.log("refresh!!");
          if(response.status === 200){
            var accessToken = response.data.accessToken;
            setMovement(response.data.movement);
            Cookie.set("token", accessToken, { expires: 0.015 });
            console.log("refresh complete @"+accessToken);
          }
        })
        .catch(function (error) {
          console.log("Error while attempting refresh!!");
          console.log(error);
        });
      }         
      else
      {stopRefreshing();
      redir();
      console.log("Logging out");}
    }
    return (<>
      {movement = hasMovement? true:false}
    </>)
  }
export default Extendtoken;