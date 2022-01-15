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

export function DashboardTemplate({ data, isLoading, error, refetch }) {
  const [workoutData, setWorkoutData] = useState([]);

  function normalizeString(string) {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function filterWorkoutDataBasedOnValue(searchedValue) {
    if (isLoading === true) {
      setWorkoutData([]);
    } else {
      setWorkoutData(
        data.user.workouts.filter((item) => {
          if (searchedValue === undefined) {
            return true;
          }

          return normalizeString(item.name).includes(
            normalizeString(searchedValue),
          );
        }),
      );
    }
  }

  useEffect(() => {
    filterWorkoutDataBasedOnValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

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
              <Label className={'green mt4'}>Filter trainings by name</Label>
              <TextInput
                className={'mw5-l ml-auto-l tr-l'}
                placeholder={'name...'}
                id={'filterInput'}
                onChange={(e) => {
                  filterWorkoutDataBasedOnValue(e.target.value);
                }}
              />
            </div>
          </div>

          {isLoading && !workoutData && <Loading />}

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
                  .map((item) => (
                    <DashboardTrainingCard item={item} />
                  ))}
              </div>
              <Heading size={'xl'} className={'green pb4 mt4'}>
                Archived
              </Heading>
              <div className={'mt3 overflow-x-auto nowrap-ns'}>
                {workoutData
                  .filter((item) => item.isArchived === true)
                  .map((item) => (
                    <DashboardTrainingCard item={item} />
                  ))}
              </div>
            </div>
          )}
        </MainSection>
      </PageLayout>
    </>
  );
}
