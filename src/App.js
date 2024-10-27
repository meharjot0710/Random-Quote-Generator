import React, { useState, useEffect } from "react";
import "./App.css";
import colors from "./Data/colors";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Col, Row } from "react-bootstrap";

const App = () => {
  let [quote,setquote]=useState("");
  let [auth,setauth]=useState("");
  let [arrquote,setarrquote]=useState();
  let [randomNumber, setRandomNumber] = useState(0);
  useEffect(() => {
    const element = document.getElementsByClassName('main-container')[0];
    element.style.backgroundColor = colors[0];
    const but = document.getElementsByClassName('new-quote')[0];
    but.style.backgroundColor = colors[0];
    const quote = document.getElementsByClassName('text')[0];
    quote.style.color = colors[0];
    const author = document.getElementsByClassName('author')[0];
    author.style.color = colors[0];
    const tweet = document.getElementsByClassName('tweet-quote')[0];
    tweet.style.backgroundColor = colors[0];
    fetchQuotes();
}, []);



  const fetchQuotes = async () => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
    .then((res)=>res.json())
    .then((res)=>{
      setarrquote(res.quotes);
      if(quote==""){
        setquote(res.quotes[0].quote);
        setauth(res.quotes[0].author);
      }
      console.log(res);
    });
  };
  const generateRandomNumber = () => { 
    const min = 1;
    const max = 100;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(rand);
  };
  let changequoteandcolor=()=>{
    generateRandomNumber();
    const container = document.getElementsByClassName('main-container')[0];
    container.style.backgroundColor = colors[randomNumber];
    const tweet = document.getElementsByClassName('tweet-quote')[0];
    tweet.style.backgroundColor = colors[randomNumber];
    const but = document.getElementsByClassName('new-quote')[0];
    but.style.backgroundColor = colors[randomNumber];
    const quote = document.getElementsByClassName('text')[0];
    quote.style.color = colors[randomNumber];
    const author = document.getElementsByClassName('author')[0];
    author.style.color = colors[randomNumber];
    setquote(arrquote[randomNumber].quote);
    setauth(arrquote[randomNumber].author);
  }
  return (
    <div className="main-container">
      <div className="quote-box">
        <div className="text">"{ quote }"</div>
        <div className="author">- { auth }</div>
        <div className="containbut">
          <div>
            <a target="_blank" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote}`}><i className="fab fa-twitter tweet-quote" style={{ fontSize: '38px', color: 'white' }}></i></a>
          </div>
          <div>
            <button className="new-quote" onClick={changequoteandcolor}>New Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
