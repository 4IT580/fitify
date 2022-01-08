import types from '../utils/types';
import { INITIAL_STATE } from '../utils/InititalState';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.INITIAL_STATE:
          return INITIAL_STATE
        case types.ADD_EXERCISE:
            return {
                ...state,
                config: {
                    ...state.config,
                    exercises: [...state.config.exercises, action.exercise]
                }
            };

        case types.UPDATE_EXERCISES:
            return {
                ...state,
                config: {
                    ...state.config,
                    exercises: action.exercises
                }
            };

        case types.SET_START_TIME:
            return {
                ...state,
                startTime: action.startTime
            };

        case types.UPDATE_WORK_TIME:
            return {
                ...state,
                config: {
                    ...state.config,
                    workTime: action.time
                }
            };

        case types.UPDATE_REST_TIME:
            return {
                ...state,
                config: {
                    ...state.config,
                    restTime: action.time
                }
            };

        case types.UPDATE_SETS:
            return {
                ...state,
                config: {
                    ...state.config,
                    sets: action.sets
                }
            };

        case types.UPDATE_SOUND_MODE: 
            return {
                ...state,
                soundOn: action.soundOn
            }

        case types.IS_CONFIG_VALID:
            return {
                ...state,
                isConfigValid: action.isValid
            };
        
        case types.IS_EXERCISE_INPUT_VALID:
            return {
                ...state,
                isExerciseInputValid: action.isValid
            };

        case types.IS_RADIAL_COUNTER_ON:
            return {
                ...state,
                isRadialCounterOn: action.isRadialCounterOn
            }

        default:
             return state;
    }
}
