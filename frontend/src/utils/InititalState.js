import { DARK_THEME } from '../utils/Themes';

export const INITIAL_STATE = {
    config: {
        exercises: [],
        workTime: 0,
        restTime: 0,
        sets: 0
    },
    isConfigValid: false,
    isExerciseInputValid: false,
    theme: DARK_THEME,
    soundOn: true,
    isRadialCounterOn: true,
    workoutTotalTime: 12
}
