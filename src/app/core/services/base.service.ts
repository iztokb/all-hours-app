import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IService } from '../models';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService implements IService {
  public subscriptions: Subscription[] = [];

  public subscriptionsActiveUntil: Subject<void> = new Subject<void>();

  unsubscribe() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.subscriptionsActiveUntil.next();
    this.subscriptionsActiveUntil.complete();
  }
}
