import React from "react";
import { hideShow } from "../static/constant/constant";

export default function Header() {
  return (
    <header>
      <span
        onClick={hideShow}
        className="material-symbols-outlined icon hide-menu-icon app mobile-menu"
      >
        apps
      </span>
      <span className="admin">Admin Dashboard</span>
    </header>
  );
}
