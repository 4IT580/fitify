import React from 'react';

import { Navigation, MobileNavigation } from 'src/organisms/';

export function TopNavigation() {
  

  return (
    <>
    <main className="top-navigation">
      <Navigation />
      <MobileNavigation />
    </main>
    </>
  );
}
