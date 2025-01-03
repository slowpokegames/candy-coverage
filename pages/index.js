import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Head from 'next/head';
import CandyCoverageGame from "../components/CandyCoverageGame";

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    // Loads when the game starts
  }, [])

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height"></meta>
      </Head>
      <div className="container">

      <div className="row">
          <div className="logo-div">
            <img className="logo" src="candy-coverage-logo.png"></img>
          </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-3">High Score: {highScore}</div>
        <div className="col-5">
          {options === null ? (
            <>
              <button onClick={() => setOptions(7)}>Easy</button>
              <button onClick={() => setOptions(6)}>Medium</button>
              <button onClick={() => setOptions(5)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(prevOptions)
                  }, 5)
                }}
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>
      </div>

      {options ? (
        <CandyCoverageGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <div>
        <h2>Choose a difficulty to begin!</h2>
          <img src="cards/rules.png" className="rules"></img>
        </div>
      )}
      <style jsx global>
  {`
    body {
      text-align: center;
      font-family: -apple-system, sans-serif;
      will-change: opacity;
    }
    .container {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    button {
      background: #00ad9f;
      border-radius: 4px;
      font-weight: 700;
      color: #fff;
      border: none;
      padding: 7px 15px;
      margin-left: 8px;
      cursor: pointer;
    }
    button:hover {
      background: #008378;
    }
    button:focus {
      outline: 0;
    }
    #cards {
      width: ${90*2}px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
    }
    .card {
      width: 80px;
      height: 112px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .c {
      position: absolute;
      max-width: 80px;
      max-height: 112px;
      width: 30ch;
      height: 30ch;
      cursor: pointer;
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      will-change: transform, opacity;
    }
    .logo-div {
      width: 100%;
      height: 100%;
    }
    @media only screen and (min-width: 300px) {
      #cards {
        width: ${100*3-10}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 90px;
        height: 123px;
        margin-bottom: 10px;
        margin-right: 0px;
      }
      .card:not(:nth-child(3n)) {
        width: 90px;
        height: 123px;
        margin-bottom: 10px;
        margin-right: 10px;
      }
      .c {
        position: absolute;
        max-width: 90px;
        max-height: 123px;
        width: 90px;
        height: 123px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 100%;
        height: 100%;
      }
    }

    @media only screen and (min-width: 560px) {
      #cards {
        width: ${140*4-10}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 130px;
        height: 177px;
        margin-bottom: 10px;
        margin-right: 0px;
      }
      .card:not(:nth-child(4n)) {
        width: 130px;
        height: 177px;
        margin-bottom: 10px;
        margin-right: 10px;
      }

      .c {
        position: absolute;
        max-width: 130px;
        max-height: 177px;
        width: 130px;
        height: 177px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 75%;
        height: 100%;
      }
    }

    @media only screen and (min-width: 720px) {
      #cards {
        width: ${142*5-10}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 130px;
        height: 177px;
        margin-bottom: 10px;
        margin-right: 0px;
      }
      .card:not(:nth-child(5n)) {
        width: 130px;
        height: 177px;
        margin-bottom: 10px;
        margin-right: 10px;
      }

      .c {
        position: absolute;
        max-width: 130px;
        max-height: 177px;
        width: 130px;
        height: 177px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 50%;
        height: 50%;
      }
    }

    @media only screen and (min-width: 880px) {
      #cards {
        width: ${142*6-10}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 130px;
        height: 177px;
        margin-bottom: 10px;
        margin-right: 0px;
      }
      .card:not(:nth-child(6n)) {
        width: 130px;
        height: 177px;
        margin-bottom: 10px;
        margin-right: 10px;
      }

      .c {
        position: absolute;
        max-width: 130px;
        max-height: 177px;
        width: 130px;
        height: 177px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 50%;
        height: 50%;
      }
    }

    @media only screen and (min-width: 1030px) {
      #cards {
        width: ${156*options-14}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 134px;
        height: 186px;
        margin-bottom: 14px;
        margin-right: 0px;
      }
      .card:not(:nth-child(${options}n)) {
        width: 134px;
        height: 186px;
        margin-bottom: 14px;
        margin-right: 14px;
      }
      .c {
        position: absolute;
        max-width: 134px;
        max-height: 186px;
        width: 134px;
        height: 186px;
        cursor: pointer;
        border-radius: 9px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 14px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 50%;
        height: 50%;
      }
    }

    @media only screen and (min-width: 1180px) {
      #cards {
        width: ${170*options-20}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 150px;
        height: 210px;
        margin-bottom: 20px;
        margin-right: 0px;
      }
      .card:not(:nth-child(${options}n)) {
        width: 150px;
        height: 210px;
        margin-bottom: 20px;
        margin-right: 20px;
      }
      .c {
        position: absolute;
        max-width: 180px;
        max-height: 252px;
        width: 150px;
        height: 210px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 50%;
        height: 50%;
      }
    }

    @media only screen and (min-width: 1390px) {
      #cards {
        width: ${200*options-20}px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .card {
        width: 180px;
        height: 252px;
        margin-bottom: 20px;
        margin-right: 0px;
      }
      .card:not(:nth-child(${options}n)) {
        width: 180px;
        height: 252px;
        margin-bottom: 20px;
        margin-right: 20px;
      }
      .c {
        position: absolute;
        max-width: 180px;
        max-height: 252px;
        width: 180px;
        height: 252px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
      .logo-div {
        width: 50%;
        height: 50%;
      }
    }

    .front,
    .back {
      background-size: cover;
    }

    .back {
      background-image: url(cards/back.png);
    }

    .front {
      background-image: url(cards/card00.png);
      background-color: white;
    }

    .logo {
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      will-change: transform, opacity;
    }
    .rules {
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      will-change: transform, opacity;
    }
    * {
      box-sizing: border-box;
    }

    .row::after {
      content: "";
      clear: both;
      display: table;
    }

    [class*="col-"] {
      float: left;
      padding: 15px;
      width: 100%;
    }

    @media only screen and (min-width: 560px) {
      /* For desktop: */
      .col-1 {width: 8.33%;}
      .col-2 {width: 16.66%;}
      .col-3 {width: 25%;}
      .col-4 {width: 33.33%;}
      .col-5 {width: 41.66%;}
      .col-6 {width: 50%;}
      .col-7 {width: 58.33%;}
      .col-8 {width: 66.66%;}
      .col-9 {width: 75%;}
      .col-10 {width: 83.33%;}
      .col-11 {width: 91.66%;}
      .col-12 {width: 100%;}
      .logo {
        border-radius: 12px;
        transform: rotateZ(-20deg);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        will-change: transform, opacity;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }
  `}
      </style>
          </div>
  )
}
