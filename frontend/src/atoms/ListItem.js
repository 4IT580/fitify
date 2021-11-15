import React from "react";
import { Heading } from "./Heading";

export function ListItem ({children}) {
  return (
    <li className="f5 f7-ns lh-copy measure mv0 green">
      {children}
    </li>
  )
}
