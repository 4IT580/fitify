import React from 'react';
import { Heading } from './Heading';
import { ListItem } from './ListItem';
import classNames from 'classnames';

export function List({ headerValue, items, className }) {
  return (
    <div className={classNames('', className)}>
      {(items.length > 0 && (
        <>
          <Heading size={'md'} className={'fw5 mt2 mt3'}>
            {headerValue}
          </Heading>
          {items.map((item) => (
            <ListItem key={item.id}>{item.name}</ListItem>
          ))}
        </>
      )) || <>&nbsp;</>}
    </div>
  );
}
