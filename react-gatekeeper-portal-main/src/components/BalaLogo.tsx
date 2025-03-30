
import React from "react";
import { Link } from "react-router-dom";

const BalaLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-bala-button text-2xl font-bold tracking-wider">MegaMart</span>
      <span className="text-red-500 text-2xl font-bold">.</span>
    </Link>
  );
};

export default BalaLogo;
