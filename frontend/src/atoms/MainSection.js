import React from 'react';

export function MainSection({ children }) {
  return (
    <>
      <main className="main-section">
        <div className="cf">
          <section className="fl w-100 pa2 pa5-ns pb6">
            <div className="tl">{children}</div>
          </section>
        </div>
      </main>
    </>
  );
}
