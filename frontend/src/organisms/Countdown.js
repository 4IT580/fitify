import React, { Component } from 'react';

import ProgressBar from './ProgressBar';
import { PositiveButton, NegativeButton, Heading } from 'src/atoms';

import { secondsToTimeString } from '../utils/date';

export default class Countdown extends Component {
  render = () => {
    const {
      workoutName,
      resting,
      currentExercise,
      nextExercise,
      secondsLeft,
      totalTime,
      startPauseIcon,
      startOrPause,
      cancelWorkout,
      sets,
      currentSet,
      isRadialCounterOn,
      workoutTotalTime,
    } = this.props;
    const percentLeft = (secondsLeft / totalTime) * 100;

    const displayNumber =
      secondsLeft <= 0
        ? parseFloat(secondsLeft).toFixed(1).toString().padStart(4, 0)
        : parseFloat(secondsLeft).toFixed(1);

    let eta =
      workoutTotalTime <= 0
        ? parseFloat(workoutTotalTime).toFixed(0).toString().padStart(4, 0)
        : parseFloat(workoutTotalTime).toFixed(0);
    if(workoutTotalTime < 0){
      eta = 0;
    }
    
    return (
      <div className="countdown-page">
        <Heading size={'xl'} className={'green fl'}>
          {workoutName}
        </Heading>

        <div>
          <header className="countdown-title">
            {resting ? 'Rest' : currentExercise}
          </header>
          <div className="countdown-upNext">
            {resting && `Next: ${nextExercise}`}
          </div>
        </div>
        <ProgressBar
          percentageLeft={percentLeft}
          totalTime={totalTime}
          secondsLeft={secondsLeft}
          resting={resting}
          isRadialCounterOn={isRadialCounterOn}
        />
        <div
          className={'f-headline'}
          style={{ transform: 'translate(0%, -275px)' }}
        >
          {displayNumber}
        </div>
        <div className={'f2'} style={{ transform: 'translate(0%, -245px)' }}>
          Set: {currentSet} / {sets}
        </div>
        <div
          className={'f3 green'}
          style={{ transform: 'translate(0%, -245px)' }}
        >
          Time: {secondsToTimeString(eta)}
        </div>
        <div className="countdown-interactionBar nt6">
          <PositiveButton icon={startPauseIcon} onClick={startOrPause} />
          <NegativeButton icon={'stop'} onClick={cancelWorkout} />
        </div>
        <Heading size={'sm'} className={'bg-dark pa4 br3'}>
          When training is finished, you will be able to close training with
          button, and input number of calories you've burned.
        </Heading>
      </div>
    );
  };
}
