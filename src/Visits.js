import React from "react";

const Visits = ({ siteVisits, Wrapper: h2 }) => {
  return siteVisits ? (
    <h2 className="visits">
      Saving over {siteVisits} scared employees since 2021.
    </h2>
  ) : (
    <h2 className="visits" style={{ color: "transparent" }}>
      Loading...{" "}
    </h2>
  );
};

export default Visits;
