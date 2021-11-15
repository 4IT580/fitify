import React from "react";
import { Heading } from "./Heading";

export function ListItem ({children}) {
  return (
    <li className="f4 f5-ns lh-copy measure mv0 green">
      {children}
    </li>
  )
}
