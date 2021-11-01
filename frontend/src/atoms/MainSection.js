import React from 'react';
import { Footer } from 'src/atoms/';

export function MainSection({ children }) {
  return (
    <>
      <main className="main-section ">
        <div className="cf right-offset">
          <section className="fl w-100 bg-white pa5">
            <div className="tl">{children}</div>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
