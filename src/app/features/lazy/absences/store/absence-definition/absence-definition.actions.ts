import { createAction, props } from '@ngrx/store';
import { IAbsenceDefinition } from 'src/app/features/shared/api-models';

export const LoadAbsenceDefinitionsAction = createAction(
  '[Absence definition] Load absence definitions'
);

export const LoadAbsenceDefinitionsFailedAction = createAction(
  '[Absence definition] Load absence deinitions failed',
  props<{ error: any }>()
);

export const LoadAbsenceDefinitionsSuccessAction = createAction(
  '[Absence definition] Load absence definitions success',
  props<{ definitions: IAbsenceDefinition[] }>()
);

export const ResetAbsenceDefinitionsStoreSliceAction = createAction(
  '[Absence definition] Reset store slice to default state'
);
