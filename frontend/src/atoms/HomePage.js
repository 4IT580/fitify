import React from 'react';
import { Footer } from 'src/atoms/';

export function HomePage({ children }) {
  return (
    <>
      <main className="home-page ">
        <div className="cf right-offset">
          <section className="fl w-100 bg-white o-60 pa5 mt4">
            <div className="tl">{children}</div>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
