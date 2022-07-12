import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IApplicationState, getPhraseById$ } from 'src/app/core';

@Pipe({
  name: 'i18nPhrase',
  pure: false,
})
export class I18nPhrasePipe implements PipeTransform, OnDestroy {
  /**
   * @description
   * Value that is returned by transform method
   */
  private _phrase: string = '';

  private _subscriptions: Subscription[] = [];

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _store: Store<IApplicationState>
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  transform(phraseId: string, ...args: unknown[]): string {
    if (!phraseId) {
      console.warn('I18nPhrasePipe was invoked without providing phraseId.');
      return '';
    }

    // Resolve phrase
    this._retrivePhraseById(phraseId);

    return this._phrase;
  }

  private _retrivePhraseById(phraseId: string): void {
    const phraseSubscription = this._store
      .pipe(select(getPhraseById$(phraseId)))
      .subscribe((phrase) => {
        if (phrase) {
          this._phrase = phrase;
        }

        this._changeDetector.markForCheck();
      });

    this._subscriptions.push(phraseSubscription);
  }
}
