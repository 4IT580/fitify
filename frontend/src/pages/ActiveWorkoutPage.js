import React, { Component } from 'react';
import { useQuery, gql } from '@apollo/client';

import { ActiveWorkoutTemplate } from '../templates/ActiveWorkoutTemplate';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/auth';

import { Redirect } from 'react-router-dom';
import  Countdown  from '../organisms/Countdown';
import shortBeep from '../assets/shortAlert.mp3';
import longBeep from '../assets/longAlert.mp3';
import { withRedux } from '../utils/WithRedux';

import { MainSection } from 'src/atoms/';
import { PageLayout, WorkoutPlanView } from 'src/organisms/';


const WORKOUT_PLAN_QUERY = gql`
  query WorkoutPlanDetail($id: Int!) {
    workoutPlan(id: $id) {
      id
      name
      rounds
      roundsPauseLength
      intervalLength
      intervalPauseLength
      workoutLength
      createdAt
      exercises {
        id
        name
        description
        bodyParts {
          id
          name
        }
        equipment {
          id
          name
        }
      }
      history {
        id
        calories
        status
        startAt
        endAt
      }
    }
  }
`;

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
          currentSet: 1
      }
      this.startOrPause = this.startOrPause.bind(this)
      this.tick = this.tick.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.startTimer = this.startTimer.bind(this)

      this.shortBeep = new Audio(shortBeep);
      this.longBeep = new Audio(longBeep);
  }

  startOrPause = () => {
      const { isRunning } = this.state;
      if (isRunning) {
          this.stopTimer();
          this.setState({isRunning: !isRunning, startPauseIcon: 'play'});
      } else {
          this.startTimer();
          this.setState({isRunning: !isRunning, startPauseIcon: 'pause'});
      }
  }

  stopTimer = () => {
      clearInterval(this.timer)
  }

  startTimer = () => {
      this.timer = setInterval(this.tick, 100)
  }

  tick = () => {
      const { secondsLeft, resting, exerciseNumber, currentSet } = this.state;
      const { restTime, workTime, exercises, sets, soundOn } = this.props;
      if (secondsLeft > 4) {
          this.setState({secondsLeft: secondsLeft - 0.1})
      }
      else if (0.1 < secondsLeft && secondsLeft <= 4) {
          this.setState({secondsLeft: secondsLeft - 0.1})
          parseFloat(secondsLeft).toFixed(1) % 1 === 0 && soundOn && this.shortBeep.play();
      }
      else {
          soundOn && this.longBeep.play();
          this.stopTimer();
          const newExerciseNumber = resting ? exerciseNumber + 1 : exerciseNumber;
          this.setState({
              exerciseNumber: newExerciseNumber,
              secondsLeft: resting ? workTime : restTime,
              resting: !resting
          });
          const isAnotherExercise = (newExerciseNumber !== exercises.length-1 || resting);
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
                      resting: true
                  });
                  this.startTimer();
              } else {
                  this.setState({finished: true})
              }
          }
      }
  }

  render = () => {
      const { exerciseNumber, resting, secondsLeft, startPauseIcon, finished, currentSet } = this.state;
      const { theme, workTime, restTime, isRadialCounterOn } = this.props;
      return (
          <div>
            <PageLayout bgClass={'background background-gym-dumbbell'}>
            <MainSection>
              {finished
                  ? <Redirect to='/done' />
                  : <Countdown 
                      resting={resting}
                      currentExercise={this.props.exercises[exerciseNumber]}
                      nextExercise={this.props.exercises[exerciseNumber+1]}
                      totalTime={resting ? restTime : workTime}
                      secondsLeft={secondsLeft}
                      startPauseIcon={startPauseIcon}
                      startOrPause={this.startOrPause}
                      stopTimer={this.stopTimer}
                      sets={this.props.sets}
                      currentSet={currentSet}
                      theme={theme}
                      isRadialCounterOn={isRadialCounterOn}
                  />
              }
              </MainSection>
              </PageLayout>
          </div>
      );
  }
}

export default withRedux(ActiveWorkoutPage);