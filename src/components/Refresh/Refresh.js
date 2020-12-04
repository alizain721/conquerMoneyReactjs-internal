import { API_URL, API_REFRESH, SetMovement, GetMovement } from "../../constants/apiConstants.js";
import Cookie from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React, {useState, useEffect, useRef} from 'react';
import Button from "@material-ui/core/Button";
export const global_timer_value = 300000;//5 minutes
export var global_movement = false;//should be false
let end = false;

const Extendtoken = () =>{
  /*function promiseAsync()
  {
    RefreshReq();
    return new Promise(resolve => {
      if(end===true)
      {
        resolve('resolved');
      }
    });
    
  }
  async function AsyncFuncCall()
  {
    await(promiseAsync());
  }*/
  const [hasMovement,setMovement]= useState(false);
  var history = useHistory();
  const redir = () => {        
    Cookie.set("token", { expires: 0.0 });
    history.push("/"); //returns to login
  }
  const interval = useRef(null);
  useEffect(() => {
    window.addEventListener("mousemove", setMovement);
    return () => window.removeEventListener("mousemove", setMovement);
  }, []);
  useEffect(()=>{
  }, [interval])
  const stopRefreshing = () =>
  {
      console.log("Stopping Refresh...");
    clearInterval(interval.current);  
    end = true;
    return "end";
  }
  const RefreshReq = () => {
    console.log("Calling Refresh");
    //interval.current = setInterval(() => {
      //refreshT();
    //}, 10000)

    const refreshT = () =>
    {    
      console.log("refresh extend tests");
      var movement = global_movement;
      console.log("movement: "+movement);
      if(movement)
      {
        axios
        .post(API_URL + API_REFRESH, {
            movement: movement,  
            token: Cookie.get("token"),
        })
        .then((response) => {
          if(response.status === 200){
            var accessToken = response.data.accessToken;
            global_movement = response.data.movement;
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
      {
        stopRefreshing();
        redir();
        console.log("Logging out");
      }
    }
    
  };
  RefreshReq();
/*return (<div class={global_movement = hasMovement? "true":"false"}>
  <div class={AsyncFuncCall()}></div>
</div>
)*/
return (<div>
  <p>Movement:{global_movement = hasMovement? "true":"false"}</p>
  <button onClick={RefreshReq}>refresh</button>
</div>)
}
export default Extendtoken;