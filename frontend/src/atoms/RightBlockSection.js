import React from 'react';
import { Heading, Footer } from 'src/atoms/';

export function RightBlockSection ({children}) {
  return (
    <>
      <main className="main-section ">
        <div className="cf right-offset">
          <section className="fl w-50-l w-100">
            <span>&nbsp;</span>
          </section>
          <section className="fl w-50-l w-100 bg-white pa5">
            <div className="">{children}</div>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
