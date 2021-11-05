import React from 'react';
import { Footer } from 'src/atoms/';

export function MainSectionDashboard({ children }) {
  return (
    <>
      <main className="main-section-dashboard ">
        <div className="cf right-offset vh-100">
          <section className="fl w-100 pa3 mb6">
            <div className="tl">{children}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
