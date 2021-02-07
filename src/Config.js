import { Button, Input } from "antd";
import {
  SendOutlined,
  CloseOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Visits from "./Visits";
import React, { useState, useEffect } from "react";
import "./Config.scss";
import ClearDataButton from "./ClearDataButton";

const useStateWithLocalStorageUnique = (localStorageKey) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || []
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify([...new Set(value)]));
  }, [value]);

  return [value, setValue];
};

const Config = ({ siteVisits }) => {
  const [links, setLinks] = useStateWithLocalStorageUnique("links");

  useEffect(() => (document.title = "I'm Productive | Configuration"), []);

  const updateEntryAt = (newVal, entryIndex) => {
    if (!newVal.includes("://")) {
      // if it doesn't have a protocol in front of it, autoassume https
      newVal = "https://" + newVal.trim();
    }

    let entries = [...links];
    entries[entryIndex] = newVal;
    setLinks(entries);
  };

  const deleteEntryAt = (index) => {
    let entries = [...links];
    entries.splice(index, 1);

    setLinks(entries);
  };

  const AddLink = () => (
    <Button
      icon={<PlusSquareOutlined />}
      onClick={() => setLinks([...links, "https://www.google.com"])}
      className="add-link"
    >
      Add Link
    </Button>
  );

  return (
    <div className="config-page">
      <h2>Configure Redirect Links</h2>
      {links?.length === 0 && (
        <p>
          Click <AddLink /> to get started.
        </p>
      )}
      <p>
        When you go onto any other part of this website that's not{" "}
        <code>/config</code>, this website will automatically redirect you to a
        random url in this list.
      </p>
      <p>
        It's up to you to make sure that they work, and{" "}
        <b>all duplicates will be deleted.</b>
      </p>
      {links?.length > 0 && (
        <>
          <h3>Links</h3>
          <ul className="link-container">
            {links.map((link, ind) => (
              <li key={ind}>
                <Button
                  onClick={() =>
                    window.open(link, "_blank", "noopener noreferrer")
                  }
                >
                  Test Link
                </Button>
                <input
                  value={link}
                  onChange={(e) => updateEntryAt(e.target.value, ind)}
                />
                <Button
                  onClick={() => deleteEntryAt(ind)}
                  icon={<CloseOutlined />}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      <br />
      <div className="control-bar">
        <ClearDataButton />
        <AddLink />
      </div>

      <Visits siteVisits={siteVisits} />
    </div>
  );
};

export default Config;
