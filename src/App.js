import logo from "./logo.svg";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import countapi from "countapi-js";

import "./App.scss";
import { useEffect, useState } from "react";
import Config from "./Config";
import Visits from "./Visits";
import ClearDataButton from "./ClearDataButton";
import Footer from "./Footer";

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [siteVisits, setSiteVisits] = useState();

  useEffect(() => {
    countapi.hit("improductive.space", "visits").then((res) => {
      setSiteVisits(res.value);
    });
    const previousData = JSON.parse(window.localStorage.links || null);
    if (previousData && previousData.length !== 0) {
      setIsFirstLoad(false);
    }
  }, []);

  const isValidHttpUrl = (str) => {
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const getRandomSite = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const redirectToRandomSite = () => {
    // find ok website by making new urls
    const availUrls = JSON.parse(window.localStorage.links);
    let websiteUrl = getRandomSite(availUrls);

    while (!isValidHttpUrl(websiteUrl)) {
      websiteUrl = getRandomSite(availUrls);
    }

    // redirect
    window.location.assign(websiteUrl);
  };
  return (
    <div className="App">
      <div>
        <h1>I'm Productive 🔨</h1>

        {window.location.pathname === "/config" ? (
          // show config
          <>
            <Config siteVisits={siteVisits} />
            <br />
          </>
        ) : isFirstLoad ? (
          // first load
          <>
            <Visits siteVisits={siteVisits} Wrapper={() => <h2></h2>} />
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => (window.location.pathname = "/config")}
            >
              Get Started <ArrowRightOutlined />
            </Button>
          </>
        ) : (
          // redirect
          <>
            <p>Redirecting...</p>
            {redirectToRandomSite()}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
