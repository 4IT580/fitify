import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './Actions';

const mapStateToProps = (state) => ({
  exercises: state.config.exercises,
  workTime: state.config.workTime,
  restTime: state.config.restTime,
  sets: state.config.sets,
  isConfigValid: state.isConfigValid,
  isExerciseInputValid: state.isExerciseInputValid,
  theme: state.theme,
  soundOn: state.soundOn,
  isRadialCounterOn: state.isRadialCounterOn,
  startTime: state.startTime,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export const withRedux = connect(mapStateToProps, mapDispatchToProps);
