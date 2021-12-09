import { DARK_THEME } from '../utils/Themes';

export const INITIAL_STATE = {
    config: {
        exercises: ["Kliky", "Dřepy", "Plank"],
        workTime: 10,
        restTime: 10,
        sets: 2
    },
    isConfigValid: false,
    isExerciseInputValid: false,
    theme: DARK_THEME,
    soundOn: true,
    isRadialCounterOn: true
}