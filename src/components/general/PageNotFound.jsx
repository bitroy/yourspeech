import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div>
    <h1>404 Page Not Found!!</h1>
    <h4>
      <Link to="/">Go Home</Link>
    </h4>
  </div>
);
export default PageNotFound;
