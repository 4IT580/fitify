import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import Countdown from '../organisms/Countdown';
import shortBeep from '../assets/shortAlert.mp3';
import longBeep from '../assets/longAlert.mp3';
import { withRedux } from '../utils/WithRedux';

import { MainSection } from 'src/atoms/';
import { PageLayout } from 'src/organisms/';
import { route } from '../Routes';
import { Link } from '../atoms';
import { ConfirmModal } from '../molecules';

import { CountdownCircleTimer } from "react-countdown-circle-timer";

class ActiveWorkoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      finished: false,
      startPauseIcon: 'play',
      exerciseNumber: 0,
      resting: false,
      secondsLeft: this.props.workTime,
      currentSet: 1,
      workoutTotalTime: 0,
      showCancel: false,
      showPause: false,
      countFiveSecOnStart: false,
      countFiveSec: false,
      firstFiveSec: true,
      firstCancelCalled: true,
    };
    this.startOrPause = this.startOrPause.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.cancelWorkout = this.cancelWorkout.bind(this);

    this.shortBeep = new Audio(shortBeep);
    this.longBeep = new Audio(longBeep);
  }

  startOrPause = () => {
    const { isRunning } = this.state;
    if (isRunning) {
      this.stopTimer();
      this.setState({ isRunning: !isRunning, startPauseIcon: 'play' });
        this.setState({ showPause: !this.state.showPause });

    } else {
      if (this.state.firstFiveSec) {
        this.setState({ countFiveSecOnStart: !this.state.countFiveSecOnStart });
        this.state.firstFiveSec = false;
      } else {
        this.setState({ countFiveSecOnStart: false });
        this.startTimer();
        this.setState({ isRunning: !isRunning, startPauseIcon: 'pause' });
      }
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  cancelWorkout = () => {
    if (this.state.isRunning) {
      this.startOrPause();
    }
    this.setState({ showCancel: !this.state.showCancel });
  };

  startTimer = () => {
    this.timer = setInterval(this.tick, 100);
    this.state.firstCancelCalled=false;

  };

  tick = () => {
    const {
      secondsLeft,
      resting,
      exerciseNumber,
      currentSet,
      workoutTotalTime,
    } = this.state;
    const { restTime, workTime, exercises, sets, soundOn } = this.props;

    this.setState({ workoutTotalTime: workoutTotalTime - 0.1 });
    if (secondsLeft > 4) {
      this.setState({ secondsLeft: secondsLeft - 0.1 });
    } else if (secondsLeft > 0.1) {
      this.setState({ secondsLeft: secondsLeft - 0.1 });
      parseFloat(secondsLeft).toFixed(1) % 1 === 0 &&
        soundOn &&
        this.shortBeep.play();
    } else {
      soundOn && this.longBeep.play();
      this.stopTimer();
      const newExerciseNumber = resting ? exerciseNumber + 1 : exerciseNumber;
      this.setState({
        exerciseNumber: newExerciseNumber,
        secondsLeft: resting ? workTime : restTime,
        resting: !resting,
      });
      const isAnotherExercise =
        newExerciseNumber !== exercises.length - 1 || resting;
      if (isAnotherExercise) {
        this.startTimer();
      } else {
        this.stopTimer();
        const isAnotherSet = currentSet < sets;
        if (isAnotherSet) {
          const newSetNumber = currentSet + 1;
          this.setState({
            exerciseNumber: -1,
            currentSet: newSetNumber,
            secondsLeft: restTime,
            resting: true,
          });
          this.startTimer();
        } else {
          this.setState({ finished: true });
        }
      }
    }
  };

  render = () => {
    const { exerciseNumber, resting, startPauseIcon, finished, currentSet } =
      this.state;
    const {
      workTime,
      restTime,
      isRadialCounterOn,
      workoutName,
      workoutPlanId,
      startTime,
    } = this.props;

    if (this.state.workoutTotalTime === 0) {
      this.state.workoutTotalTime = this.props.workoutTotalTime;
      this.state.secondsLeft = this.props.workTime;
    }

    return (
      <div>
        <PageLayout bgClass={'background background-gym-dumbbell'}>
          <MainSection>
            {finished ? (
              <Redirect
                to={route.finishWorkout(workoutPlanId, startTime.valueOf())}
              />
            ) : (
              <Countdown
                workoutName={workoutName}
                resting={resting}
                currentExercise={this.props.exercises[exerciseNumber]}
                nextExercise={this.props.exercises[exerciseNumber + 1]}
                totalTime={resting ? restTime : workTime}
                secondsLeft={this.state.secondsLeft}
                workoutTotalTime={this.state.workoutTotalTime}
                startPauseIcon={startPauseIcon}
                startOrPause={this.startOrPause}
                cancelWorkout={this.cancelWorkout}
                sets={this.props.sets}
                currentSet={currentSet}
                isRadialCounterOn={isRadialCounterOn}
              />
            )}

            {(this.state.showCancel || this.state.showPause) && (
              <ConfirmModal message={(this.state.showCancel ? 'End this training?' : 'Your training is paused')}>
                <Link
                  className={
                    'w-40 link dim br-pill tc pv3 dib red bg-red ma2'
                  }
                  noUnderline={true}
                  to={route.dashboard()}
                >
                  End
                </Link>
                <Link
                  className={
                    'w-40 link dim br-pill tc pv3 dib dark bg-green ma2'
                  }
                  noUnderline={true}
                  to={'#'}
                  onClick={() => {
                      if(this.state.showCancel && this.state.firstCancelCalled){
                        this.setState({showCancel: false});
                      }else if(this.state.showCancel){
                        this.setState({showCancel: false});
                        this.setState({ countFiveSec: !this.state.countFiveSec });
                      }
                      if(this.state.showPause){
                        this.setState({showPause: false});
                        this.setState({ countFiveSec: !this.state.countFiveSec });
                      }
                  }}
                >
                  Continue
                </Link>
              </ConfirmModal>
            )}

            {(this.state.countFiveSec || this.state.countFiveSecOnStart) && (
              <ConfirmModal message={(this.state.countFiveSecOnStart ? 'Your training is starting in' : 'Your training is being resumed in')}>
                <div className="fiveSecTimer absolute--fill flex  justify-center mt5">
                  <CountdownCircleTimer
                    isPlaying
                    duration={5}
                    colors={['#bffa29']}
                    children={{ color: 'green' }}
                    trailColor={['#282c34']}
                    onComplete={() => {
                      if (this.state.countFiveSec) {
                        this.setState({countFiveSec: false});
                      }
                      if (this.state.countFiveSecOnStart) {
                        this.setState({countFiveSecOnStart: false});
                      }
                      this.startOrPause()
                    }}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                </div>
              </ConfirmModal>
            )}
          </MainSection>
        </PageLayout>
      </div>
    );
  };
}

export default withRedux(ActiveWorkoutPage);
