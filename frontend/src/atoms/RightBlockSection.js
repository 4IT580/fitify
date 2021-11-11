import React from 'react';
import { Heading, Footer } from 'src/atoms/';

export function RightBlockSection({ children }) {
  return (
    <>
      <main className="home-page ">
        <div className="cf right-offset vh-100 overflow-auto">
          <section className="fl w-60-l w-20-m w-100">
            <span>&nbsp;</span>
          </section>
          <section className="fl w-30-l w-60-m w-100 bg-white br2 pa5 mb2">
            <div className="">{children}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
