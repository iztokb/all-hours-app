import { createAction, props } from '@ngrx/store';
import { IAbsence } from 'src/app/features/shared/api-models';
import { ILoadDataOnDemand } from 'src/app/features/shared/data-settings';

export const AbsencesSearchChangedAction = createAction(
  '[Absences] absences search changed',
  props<{ search: string }>()
);

export const DeleteAbsenceAction = createAction(
  '[Absences] Delete absence',
  props<{ absence: IAbsence }>()
);

export const DeleteAbsencesFailedAction = createAction(
  '[Absences] Delete absence failed',
  props<{ error: any }>()
);

export const DeleteAbsencesSuccessAction = createAction(
  '[Absences] Delete absence success',
  props<{ absence: IAbsence }>()
);

export const LoadAbsencesAction = createAction(
  '[Absences] Load absences',
  props<{ params: ILoadDataOnDemand }>()
);

export const LoadAbsencesFailedAction = createAction(
  '[Absences] Load absences failed',
  props<{ error: any }>()
);

export const LoadAbsencesSuccessAction = createAction(
  '[Absences] Load absences success',
  props<{ absences: IAbsence[] }>()
);

export const PostAbsenceAction = createAction(
  '[Absences] Post absence',
  props<{ record: IAbsence }>()
);

export const PostAbsenceFailedAction = createAction(
  '[Absences] Post absence failed',
  props<{ error: any }>()
);

export const PostAbsenceSuccessAction = createAction(
  '[Absences] Post absence success',
  props<{ absence: IAbsence }>()
);

export const ResetAbsencesStoreSliceAction = createAction(
  '[Absences] Reset store slice to default state'
);

export const UpdateAbsenceAction = createAction(
  '[Absences] Update absence',
  props<{ record: IAbsence }>()
);

export const UpdateAbsenceFailedAction = createAction(
  '[Absences] Update absence failed',
  props<{ error: any }>()
);

export const UpdateAbsenceSuccessAction = createAction(
  '[Absences] Update absence success',
  props<{ absence: IAbsence }>()
);
