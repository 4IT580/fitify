import React  from 'react';
import { Footer } from "../molecules";
import { TopNavigation } from "../organisms";

export function PageLayout ({children}) {
  return (
    <div>
      <TopNavigation/>
      <div className={'min-h-100 contain'}>
        {children}
        <Footer/>
      </div>
    </div>
  );
}
