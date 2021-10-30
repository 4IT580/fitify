import React from 'react';

import { Heading, MainSection, Footer } from 'src/atoms/';
import { QuackForm, ReloadButton } from 'src/molecules/';
import { QuackList, TopNavigation } from 'src/organisms/';

export function HomeTemplate({
  data,
  loading,
  error,
  refetchQuacks,
  quackFormState,
  currentUser,
}) {
  return (
    <>
      <TopNavigation />
      <div className="pa3 bt b--black-10 main-section">
        <section className="mw6 center pa5 o-90 homepage-header">
          <section className="o-100">
          </section>
        </section>
      </div>
      <Footer />
    </>
  );
}
