import React from 'react';
import { Footer } from 'src/atoms/';

export function RightBlockSection({ children }) {
  return (
    <>
      <main className="home-page vh-100">
        <div className="cf right-offset">
          <section className="fl w-50-l w-20-m w-100">
            <span>&nbsp;</span>
          </section>
          <section className="fl w-40-l w-80-m w-100 bg-white br2 pa5">
            <div className="">{children}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
