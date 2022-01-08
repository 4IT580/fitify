import types from './types';

const addingExercise = exercise => ({
    type: types.ADD_EXERCISE,
    exercise
})

const updatingTime = (key, time) => ({
    type: key,
    time
})

const updatingStartTime = (startTime) => ({
    type: types.SET_START_TIME,
    startTime
})

const updatingValidState = (setting, isValid) => ({
        type: setting,
        isValid
})

const updatingExercises = exercises => ({
    type: types.UPDATE_EXERCISES,
    exercises
})

const updatingSets = sets => ({
    type: types.UPDATE_SETS,
    sets
})

const updateSoundMode = soundOn => ({
    type: types.UPDATE_SOUND_MODE,
    soundOn
})

const updateRadialCounterMode = isRadialCounterOn => ({
    type: types.IS_RADIAL_COUNTER_ON,
    isRadialCounterOn
})

export const toggleRadialCounter = currRadialCounterOn => dispatch => {
    dispatch(updateRadialCounterMode(!currRadialCounterOn))
}

export const setStartTime = (date) => (dispatch, getState) => {
  const filteredConfig = filterState(getState().config, types.IS_CONFIG_VALID)
  const isConfigValid = validateConfig(filteredConfig);
  const isInputValid = validateInput(date);
  dispatch(updatingValidState(types.IS_CONFIG_VALID, isConfigValid && isInputValid))
  dispatch(updatingStartTime(date))
}

export const updateSets = (actionType, sets) => (dispatch, getState) => {
    const filteredConfig = filterState(getState().config, 'sets');
    const isConfigValid = validateConfig(filteredConfig);
    const isInputValid = validateInput(sets);
    dispatch(updatingValidState(types.IS_CONFIG_VALID, isConfigValid && isInputValid))
    dispatch(updatingSets(sets))
}

export const addExercise = exercise => (dispatch, getState) => {
    const filteredConfig = filterState(getState().config, 'exercises')
    const isConfigValid = validateConfig(filteredConfig);
    const isInputValid = validateInput(exercise);
    dispatch(updatingValidState(types.IS_CONFIG_VALID, isConfigValid && isInputValid))
    dispatch(updatingValidState(types.IS_EXERCISE_INPUT_VALID, false))
    dispatch(addingExercise(exercise))
}

export const editExercise = (prevExercise, newExercise) => (dispatch, getState) => {
    let exercises = getState().config.exercises;
    const indexOfEditedExercise = exercises.indexOf(prevExercise);
    exercises[indexOfEditedExercise] = newExercise;
    dispatch(updatingExercises(exercises))
}

export const removeExercise = numberInList => (dispatch, getState) => {
    const indexInExercises = numberInList - 1;
    const newExercises = getState().config.exercises.filter((_, i) => indexInExercises !== i);
    const isInputValid = validateInput(newExercises);
    dispatch(updatingValidState(types.IS_CONFIG_VALID, isInputValid))
    dispatch(updatingExercises(newExercises))
}

export const initialState = foo => (dispatch) => {
    dispatch({
      type: types.INITIAL_STATE
    })
}

export const updateTime = (actionType, time) => (dispatch, getState) => {
    const key = actionType === types.UPDATE_WORK_TIME
        ? 'workTime'
        : 'restTime'
    const filteredConfig = filterState(getState().config, key)
    const isConfigValid = validateConfig(filteredConfig);
    const isInputValid = validateInput(time);
    dispatch(updatingValidState(types.IS_CONFIG_VALID, isConfigValid && isInputValid))
    dispatch(updatingTime(actionType, time))
}

export const validateExerciseInput = input => dispatch => {
    const isInputValid = validateInput(input)
    dispatch(updatingValidState(types.IS_EXERCISE_INPUT_VALID, isInputValid))
}

const validateConfig = filteredConfig => {
    return Object.keys(filteredConfig)
        .reduce((acc, currKey) => {
            if (filteredConfig[currKey].length === 0 || !filteredConfig[currKey]) acc = false
            if (filteredConfig[currKey].length === 0) acc = false
            return acc
        }, true);
}

const validateInput = input => {
    if (!input) return false 

    return input.length !== 0;
}

const filterState = (config, keyToRemove) => {
    return Object.keys(config)
        .filter(elem => elem !== keyToRemove)
        .reduce((acc, curr) => ({...acc, [curr]: config[curr]}), {})
}

export const toggleSound = currentSoundOn => dispatch => {
    const newSoundMode = !currentSoundOn;
    dispatch(updateSoundMode(newSoundMode))
}

