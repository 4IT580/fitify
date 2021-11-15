import React from 'react';
import { Footer } from 'src/atoms/';

export function MainSectionWorkout({ children }) {
  return (
    <>
      <main className="main-section-workout min-vh-100">
        <div className="cf right-offset overflow-auto-ns pa3">
          <section className="w-100 mb6">
            <div className="tl">{children}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
