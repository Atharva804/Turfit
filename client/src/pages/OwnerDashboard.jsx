import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OwnerDashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return <div>OwnerDashboard</div>;
}

export default OwnerDashboard;
