import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProgressBar from './ProgressBar';
import { Button, Heading } from 'src/atoms';

export default class Countdown extends Component {
    render = () => {
        const { workoutName, resting, currentExercise, nextExercise, secondsLeft, totalTime, startPauseIcon, startOrPause, stopTimer, sets, currentSet, theme, isRadialCounterOn } = this.props;
        const percentLeft = ((secondsLeft) / totalTime) * 100;

        const displayNumber = secondsLeft < 10
          ? parseFloat(secondsLeft).toFixed(1).toString().padStart(4, 0)
          : parseFloat(secondsLeft).toFixed(1)

        return (
          <div className="countdown-page">
            <Heading size={'xl'} className={'green fl'}>{workoutName}</Heading>

            <div>
              <header className="countdown-title">
                {resting
                  ? "Rest"
                  : currentExercise
                }
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
            <div className={'f-headline'} style={{transform: 'translate(0%, -275px)'}}>
                {displayNumber}
            </div>
            <div className={'f2'} style={{transform: 'translate(0%, -245px)'}}>
              Set: {currentSet} / {sets}
            </div>
            <div className="countdown-interactionBar nt6">
              <Button
                icon={startPauseIcon}
                onClick={startOrPause}
                size='big'
                theme={theme}
              >Start</Button>
              <Button
                icon={'stop'}
                onClick={stopTimer}
                size='big'
                theme={theme}
              >Stop</Button>
            </div>
            <Heading size={'sm'} className={'bg-dark pa4 br3'}>
              When training is finished, you will be able to close training with button, and input number of calories you've burned.
            </Heading>

          </div>
        )
    }
}
