import React from "react";
import { Button } from "rsuite";
import Comp from "./Comp";
import logo from "./logo.svg";
import "./App.less";
import style from "./Test.modules.less";
import bllack from "./My.module.css";
import s from "./App.module.styl";

function App() {
  console.info("Console --- WHAT IS ", style);

  return (
    <div className="App">
      <h1 className={s.greatElement}>
        <span className={s.child}>CHILD</span>
      </h1>
      <Button>Sssexy</Button>
      <Comp />
      <header className="App-header">
        <h2 className={style.special}>BLACKK222K</h2>
        <h3 className={bllack.black}>HAHAHA</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <p>I made this mama</p> HOW FAST?
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
