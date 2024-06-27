import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  let navigation = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigation("/");
  });

  return <header></header>;
}
