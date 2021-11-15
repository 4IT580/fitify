import React from 'react';

import { Heading } from "../atoms";
import { fromUnixTimeStamp } from "../utils/date";
import { Link } from "../organisms/WorkoutPlanView";
import classNames from "classnames";

export function Card ({headerValue, children, className, float}) {
  return (
    <div className={classNames('fl w-100 w-50-l', float)}>
      <article className={classNames('ba mb4 br4 ma2', className)}>
        <Heading size={'lg'} className={'green pa3'}>
          {headerValue}
        </Heading>
        {children}
      </article>
    </div>
  )
}
