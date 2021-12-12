import { DARK_THEME } from '../utils/Themes';

export const INITIAL_STATE = {
    config: {
        exercises: [],
        workTime: 1,
        restTime: 2,
        sets: 3
    },
    isConfigValid: false,
    isExerciseInputValid: false,
    theme: DARK_THEME,
    soundOn: true,
    isRadialCounterOn: true
}
