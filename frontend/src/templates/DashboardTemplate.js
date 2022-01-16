import React, { useEffect, useState } from 'react';

import {
  Button,
  Heading,
  Link,
  ErrorBanner,
  Loading,
  MainSection,
  TextInput,
  Label,
} from 'src/atoms/';

import { PageLayout, DashboardTrainingCard } from 'src/organisms/';
import { route } from 'src/Routes';
import { SelectInput } from "../atoms/SelectInput";
import { intervalMatches, nameMatches, pauseMatches } from "../utils/workoutFilterMatch";

export function DashboardTemplate ({data, isLoading, error, refetch}) {
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutFilter, setWorkoutFilter] = useState({
    name: '',
    interval: '',
    pause: '',
  });

  function handleFilter (evt) {
    setWorkoutFilter({
      ...workoutFilter,
      [evt.target.name]: evt.target.value
    });
  }

  useEffect(() => {
    if (isLoading === true) {
      return
    }

    setWorkoutData(
      data.user.workouts.filter((item) => {
        if (!nameMatches(workoutFilter, item.name)) {
          return false
        }

        if (!intervalMatches(workoutFilter, item.intervalLength)) {
          return false;
        }

        if (!pauseMatches(workoutFilter, item.intervalPauseLength)) {
          return false;
        }

        return true;
      }),
    );
  }, [isLoading, data, workoutFilter])

  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <MainSection>
          <div className={'dt-l dt--fixed'}>
            <div className={'dtc-l'}>
              <Heading size={'xxl'} className={'green'}>
                Dashboard
              </Heading>
            </div>
            <div className={'dtc-l tr-l items-end-l'}>
              <Button className={'w-100  w-auto-l pv3 mt3'}>
                <Link
                  to={route.newTraining()}
                  className={'bg-animate dim bg-green br-pill f3 f5-m  tc'}
                >
                  New Training
                </Link>
              </Button>
              <div className={'dt-l dt--fixed'}>
                <div className={'dtc-l ph3'}>
                  <Label className={'green mt4'} htmlFor={'filterName'}>Filter trainings by name</Label>
                  <TextInput
                    className={'mw5-l ml-auto-l '}
                    placeholder={'name...'}
                    id={'filterName'}
                    name={'name'}
                    value={workoutFilter.name}
                    onChange={handleFilter}
                  />
                </div>
                <div className={'dtc-l ph3'}>
                  <Label className={'green mt4'} htmlFor={'filterInterval'}>Filter trainings by interval</Label>
                  <SelectInput
                    className={'mw5-l ml-auto-l tr-l'}
                    id={'filterInterval'}
                    name={'interval'}
                    value={workoutFilter.interval}
                    selectOptions={[
                      {name: '', value: ''},
                      {name: 'Less than 20s', value: 'lessThan20'},
                      {name: '20-30s', value: '20to30'},
                      {name: '30-60s', value: '30to60'},
                      {name: 'More than 60s', value: 'moreThan60'},
                    ]}
                    onChange={handleFilter}
                  />
                </div>
                <div className={'dtc-l ph3'}>
                  <Label className={'green mt4'} htmlFor={'filterPause'}>Filter trainings by pause</Label>
                  <SelectInput
                    className={'mw5-l ml-auto-l tr-l'}
                    id={'filterPause'}
                    name={'pause'}
                    value={workoutFilter.pause}
                    selectOptions={[
                      {name: '', value: ''},
                      {name: 'Less than 10s', value: 'lessThan10'},
                      {name: '10-20s', value: '10to20'},
                      {name: 'More than 20s', value: 'moreThan20'},
                    ]}
                    onChange={handleFilter}
                  />
                </div>
              </div>

            </div>
          </div>

          {(isLoading || !workoutData) && <Loading/>}

          {error && (
            <ErrorBanner title={error.message}>
              <Button color="red" onClick={() => refetch()}>
                Reload
              </Button>
            </ErrorBanner>
          )}

          {workoutData && (
            <div className={'mb4'}>
              <Heading size={'xl'} className={'green pb4 mt4'}>
                Trainings
              </Heading>
              <div className={'mt3 overflow-x-auto nowrap-ns'}>
                {workoutData
                  .filter((item) => item.isArchived === false)
                  .map((item, index) => (
                    <DashboardTrainingCard item={item} key={'trainings' + index}/>
                  ))}
              </div>
              <Heading size={'xl'} className={'green pb4 mt4'}>
                Archived
              </Heading>
              <div className={'mt3 overflow-x-auto nowrap-ns'}>
                {workoutData
                  .filter((item) => item.isArchived === true)
                  .map((item, index) => (
                    <DashboardTrainingCard item={item} key={'archived-trainings' + index}/>
                  ))}
              </div>
            </div>
          )}
        </MainSection>
      </PageLayout>
    </>
  );
}
