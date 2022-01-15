import React from 'react';
import { Heading } from '../atoms';

export function ConfirmModal({ message, children }) {
  return (
    <div className={'modal absolute absolute--fill flex  justify-center'}>
      <div className="bg-dark br3 pa5 tc fa-border w-30-ns self-start mt6">
        <Heading size={'xl'} className={'white'}>
          {message}
        </Heading>
        <div className={'mt4'}>{children}</div>
      </div>
    </div>
  );
}
