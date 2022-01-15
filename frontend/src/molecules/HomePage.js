import React from 'react';

export function HomePage({ children }) {
  return (
    <>
      <main>
        <div className="cf right-offset">
          <div className="fl w-100 workout-pill pa5 mt4 tl">{children}</div>
        </div>
      </main>
    </>
  );
}
