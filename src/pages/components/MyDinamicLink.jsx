import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line
import { useState } from "react";

export default function MyDinamicLink({ icon, text }) {
  return (
    <div className="on-Hover p-1 sm">
      <FontAwesomeIcon icon={icon} /> <span className="fs-5">{text} </span>
    </div>
  );
}
