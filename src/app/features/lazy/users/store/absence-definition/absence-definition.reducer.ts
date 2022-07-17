import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IAbsenceDefinition, IAbsenceDefinitionState } from '../../models';
import * as absenceDefinitionActions from './absence-definition.actions';

const absenceDefinitionAdapter: EntityAdapter<IAbsenceDefinition> =
  createEntityAdapter<IAbsenceDefinition>({
    selectId: (record: IAbsenceDefinition) => record.Id,
    sortComparer: false,
  });

const ABSENCE_DEFINITION_INITIAL_STATE: IAbsenceDefinitionState =
  absenceDefinitionAdapter.getInitialState({
    loaded: false,
    loading: false,
  });

export const AbsenceDefinitionsReducer = createReducer(
  ABSENCE_DEFINITION_INITIAL_STATE,
  on(
    absenceDefinitionActions.LoadAbsenceDefinitionsAction,
    (state, payload) => {
      {
        return {
          ...state,
          loaded: false,
          loading: true,
        };
      }
    }
  ),
  on(
    absenceDefinitionActions.LoadAbsenceDefinitionsFailedAction,
    (state, payload) => {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }
  ),
  on(
    absenceDefinitionActions.LoadAbsenceDefinitionsSuccessAction,
    (state, payload) => {
      return absenceDefinitionAdapter.upsertMany(payload.definitions, {
        ...state,
        loaded: true,
        loading: false,
      });
    }
  ),
  on(
    absenceDefinitionActions.ResetAbsenceDefinitionsStoreSliceAction,
    (state, payload) => {
      return ABSENCE_DEFINITION_INITIAL_STATE;
    }
  )
);
