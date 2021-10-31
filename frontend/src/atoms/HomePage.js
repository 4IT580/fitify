import React from 'react';
import { Footer } from 'src/atoms/';

export function HomePage({ children }) {
  return (
    <>
      <main className="home-page ">
        <div className="cf">
          <section className="fl w-100 bg-white pa5 mt7">
            <div className="tc">{children}</div>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}