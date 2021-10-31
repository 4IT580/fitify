import React from 'react';
import { Footer } from 'src/atoms/';

export function MainSection({ children }) {
  return (
    <>
      <main className="main-section ">
        <div className="cf">
          <section className="fl w-100 bg-white o-60 pa5 mt7">
            <div className="tl">{children}</div>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
