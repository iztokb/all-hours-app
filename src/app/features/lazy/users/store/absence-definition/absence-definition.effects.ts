import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, switchMap, catchError } from 'rxjs';
import * as absenceDefinitionActions from './absence-definition.actions';
import { HttpService } from 'src/app/core';
import { IAbsenceDefinition } from 'src/app/features/shared/api-models';

@Injectable()
export class AbsenceDefinitionEffects {
  constructor(private _actions$: Actions, private _httpService: HttpService) {}

  loadUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(absenceDefinitionActions.LoadAbsenceDefinitionsAction),
      exhaustMap((req) => {
        return this._httpService
          .get<IAbsenceDefinition[]>(
            'v1/AbsenceDefinitions',
            false,
            null,
            null,
            true
          )
          .pipe(
            switchMap((res) => {
              const definitions: IAbsenceDefinition[] = !res
                ? []
                : (res as IAbsenceDefinition[]);
              return [
                absenceDefinitionActions.LoadAbsenceDefinitionsSuccessAction({
                  definitions,
                }),
              ];
            }),
            catchError((error) => {
              return [
                absenceDefinitionActions.LoadAbsenceDefinitionsFailedAction({
                  error,
                }),
              ];
            })
          );
      })
    )
  );
}
