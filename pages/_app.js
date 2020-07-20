import "../styles/global.css";

import SwitchMode from "../components/UI/SwitchMode/SwitchMode";

import React, { Fragment, useState, useEffect } from "react";
import { Provider } from "react-redux";
import Head from "next/head";
import store from "../redux/store";

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    // document.querySelector(".dark").style.backgroundColor = "#002021";
    let dark = document.querySelector(".dark");
    if (dark !== null) {
      document.querySelector("body").style.backgroundColor = "#002021";
    } else {
      document.querySelector("body").style.backgroundColor = "#f3f3f3";
    }
  });
  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  });
  return (
    <Provider store={store}>
      <Head>
        <title>Social Media Website</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keyword"
          content="social-media, no-name, react, nextjs, materializecss"
        />
        <meta
          name="description"
          content="[No name] Is A Social Media Website Made With React, NextJS and MaterializeCSS"
        />
        <meta name="author" content="Parth Gupta" />
      </Head>
      <div className={theme}>
        <Component {...pageProps} />
        <SwitchMode theme={theme} switchMode={changeTheme} />
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      <script
        src="https://kit.fontawesome.com/0117e7f7a2.js"
        crossOrigin="anonymous"
      ></script>
    </Provider>
  );
}

export default App;
