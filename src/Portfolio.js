import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./Portfolio.css"; // Create a CSS file for styling

import picofme from "./img/picofme.png";
import linkedin from "./img/linkedin.png";
import x from "./img/x.png";
import github from "./img/github.png";
import roblox from "./img/roblox.png";

import purplesky from "./img/cyberpunk.png";

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1149217975711309914/2xlddn_mktlx-xhS0oGfxHBPL6Q_l4wOBNY7e-ySRY58do5ypzshuKvTM6mHzgEfK3Qe";

function postToWebhook(ip, msg, color) {
  let embeds = [
    {
      title: ip + " - " + msg,
      color: color,
    },
  ];
  var config = {
    method: "POST",
    url: WEBHOOK_URL, // https://discord.com/webhook/url/here
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ embeds }),
  };
  axios(config)
    .then((response) => {
      // console.log("Webhook delivered successfully");
      return response;
    })
    .catch((error) => {
      // console.log(error);
      return error;
    });
}

const Portfolio = () => {
  const [ip, setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
    postToWebhook(res.data.ip, "New Visitor!", 5174599);
  };

  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getData();
    }
  }, []);

  return (
    <div className="container" style={{ backgroundImage: `url(${purplesky})` }}>
      <span className="text">
        <b>Max Distinti | Software Engineer</b>
      </span>
      <div className="top-section">
        <img src={picofme} alt="Image 2" className="image" />
      </div>
      <hr className="divider" />
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/johnmaxwelldistinti/"
          onClick={() =>
            postToWebhook(ip, "Clicked LinkedIn Profile!", 15548997)
          }
        >
          <img src={linkedin} alt="LinkedIn" className="icon" />
        </a>
        <a
          href="https://twitter.com/Blankscarface23"
          onClick={() =>
            postToWebhook(ip, "Clicked Twitter(X) Profile!", 15548997)
          }
        >
          <img src={x} alt="X" className="icon" />
        </a>
        <a
          href="https://github.com/JohnMaxwellDistinti"
          onClick={() => postToWebhook(ip, "Clicked GitHub Profile!", 15548997)}
        >
          <img src={github} alt="GitHub" className="icon" />
        </a>
        <a
          href="https://www.roblox.com/users/16012710/profile"
          onClick={() => postToWebhook(ip, "Clicked Roblox Profile!", 15548997)}
        >
          <img src={roblox} alt="Roblox" className="icon" />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
