import React  from 'react';
import { Footer } from "../molecules";
import { TopNavigation } from "../organisms";
import classNames from "classnames";

export function PageLayout ({children, bgClass}) {

  document.body.className = bgClass

  return (
    <div>
      <TopNavigation/>
      <div className={classNames('pagelayout', bgClass)}>
        {children}
        <Footer/>
      </div>
    </div>
  );
}
