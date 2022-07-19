import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IAbsence } from 'src/app/features/shared/api-models';
import { IAbsencesState } from '../../models/absences.model';
import * as absencesActions from './absences.actions';

const absencesAdapter: EntityAdapter<IAbsence> = createEntityAdapter<IAbsence>({
  selectId: (record: IAbsence) => record.Id,
  sortComparer: false,
});

export const ABSENCES_INITIAL_STATE: IAbsencesState =
  absencesAdapter.getInitialState({
    activeSearch: '',
    deleted: false,
    deleting: false,
    loaded: false,
    loading: false,
    posted: false,
    posting: false,
    updated: false,
    updating: false,
  });

export const AbsencesReducer = createReducer(
  ABSENCES_INITIAL_STATE,
  on(absencesActions.AbsencesSearchChangedAction, (state, payload) => {
    return {
      ...state,
      activeSearch: payload.search,
    };
  }),
  on(absencesActions.DeleteAbsenceAction, (state, payload) => {
    return {
      ...state,
      deleted: false,
      deleting: true,
    };
  }),
  on(absencesActions.DeleteAbsencesFailedAction, (state, payload) => {
    return {
      ...state,
      deleted: false,
      deleting: false,
    };
  }),
  on(absencesActions.DeleteAbsencesSuccessAction, (state, payload) => {
    return absencesAdapter.removeOne(payload.absence.Id, {
      ...state,
      deleted: true,
      deleting: false,
    });
  }),
  on(absencesActions.LoadAbsencesAction, (state, payload) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),
  on(absencesActions.LoadAbsencesFailedAction, (state, payload) => {
    return {
      ...state,
      loaded: false,
      loading: false,
    };
  }),
  on(absencesActions.LoadAbsencesSuccessAction, (state, payload) => {
    // First remove current records as they are stale.
    const stateAfterDeletion = absencesAdapter.removeAll(state);

    return absencesAdapter.upsertMany(payload.absences, {
      ...stateAfterDeletion,
      loaded: true,
      loading: false,
    });
  }),
  on(absencesActions.PostAbsenceAction, (state, payload) => {
    return {
      ...state,
      posted: false,
      posting: true,
    };
  }),
  on(absencesActions.PostAbsenceFailedAction, (state, payload) => {
    return {
      ...state,
      posted: false,
      posting: false,
    };
  }),
  on(absencesActions.PostAbsenceSuccessAction, (state, payload) => {
    return absencesAdapter.upsertOne(payload.absence, {
      ...state,
      posted: true,
      posting: false,
    });
  }),
  on(absencesActions.ResetAbsencesStoreSliceAction, (state, payload) => {
    return ABSENCES_INITIAL_STATE;
  }),
  on(absencesActions.UpdateAbsenceAction, (state, payload) => {
    return {
      ...state,
      updated: false,
      updating: true,
    };
  }),
  on(absencesActions.UpdateAbsenceFailedAction, (state, payload) => {
    return {
      ...state,
      updated: false,
      updating: false,
    };
  }),
  on(absencesActions.UpdateAbsenceSuccessAction, (state, payload) => {
    return absencesAdapter.upsertOne(payload.absence, {
      ...state,
      updated: true,
      updating: false,
    });
  })
);
