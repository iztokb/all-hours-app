import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, exhaustMap, catchError } from 'rxjs';
import { HttpService } from 'src/app/core';
import {
  IAbsence,
  IAbsenceApiPayload,
} from 'src/app/features/shared/api-models';
import { TransformDataRequestPayloadToQueryParams } from '../../utils';
import * as absencesActions from './absences.actions';

@Injectable()
export class AbsencesEffects {
  constructor(private _actions$: Actions, private _httpService: HttpService) {}

  deleteAbsence$ = createEffect(() =>
    this._actions$.pipe(
      ofType(absencesActions.DeleteAbsenceAction),
      exhaustMap((req) => {
        return this._httpService
          .delete(`vi/Users/${req.absence.Id}`, false, null, null, true)
          .pipe(
            switchMap((res) => {
              return [
                absencesActions.DeleteAbsencesSuccessAction({
                  absence: req.absence,
                }),
              ];
            }),
            catchError((error) => {
              return [absencesActions.DeleteAbsencesFailedAction({ error })];
            })
          );
      })
    )
  );

  loadAbsences$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(absencesActions.LoadAbsencesAction),
      exhaustMap((req) => {
        const queryParams = TransformDataRequestPayloadToQueryParams(
          req.params
        );
        return this._httpService
          .get(`v1/Absences?${queryParams}`, false, null, null, true)
          .pipe(
            switchMap((res) => {
              const absences: IAbsence[] = !res ? [] : (res as IAbsence[]);
              return [absencesActions.LoadAbsencesSuccessAction({ absences })];
            }),
            catchError((error) => {
              return [absencesActions.LoadAbsencesFailedAction({ error })];
            })
          );
      })
    );
  });

  updateAbsence$ = createEffect(() =>
    this._actions$.pipe(
      ofType(absencesActions.UpdateAbsenceAction),
      exhaustMap((req) => {
        return this._httpService
          .put<IAbsenceApiPayload>(
            `vi/Users/${req.record.Id}`,
            false,
            req.record,
            null,
            null,
            true
          )
          .pipe(
            switchMap((res) => {
              const payload = res as unknown as IAbsence;
              return [
                absencesActions.UpdateAbsenceSuccessAction({
                  absence: payload,
                }),
              ];
            }),
            catchError((error) => {
              return [absencesActions.UpdateAbsenceFailedAction({ error })];
            })
          );
      })
    )
  );
}
