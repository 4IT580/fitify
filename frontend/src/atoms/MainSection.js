import React from 'react';

export function MainSection({ children }) {
  return (
    <div className="pa3 bt b--black-10 main-section">
      <section className="mw6 center bg-white pa4 o-90 mt6">
        <section className="o-100">
          {children}
        </section>
      </section>
    </div>
  );
}
