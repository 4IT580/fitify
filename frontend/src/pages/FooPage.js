import React, { useState } from 'react';

import { Heading, MainSection } from 'src/atoms/';
import { QuackForm, ReloadButton } from 'src/molecules/';
import { QuackList, TopNavigation } from 'src/organisms/';

export function FooPage () {

  return (
    <>
      <TopNavigation/>
      <MainSection>
        <Heading>Foobar</Heading>
        <div className="card">
          <div className="card-header">
            hello threr
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col ">
                <div className={'card bg-primary'}>
                  <div className={'card-body '}>

                    hello
                  </div>
                </div>
              </div>
              <div className="col ">
                <div className={'card bg-secondary'}>
                  <div className={'card-body'}>

                    there
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainSection>
    </>
  );
}
