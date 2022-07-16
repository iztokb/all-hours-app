import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IUser } from '../../models';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListItemComponent implements OnInit {
  /**
   * OUTPUTS
   */
  /**
   * Emitted when user clicks detail button
   */
  @Output() openUserDetail: EventEmitter<IUser> = new EventEmitter<IUser>();

  /**
   * INPUTS
   */
  /**
   * @description
   * Organization user record
   */
  @Input() user!: IUser;

  constructor() {}

  ngOnInit(): void {}

  openUserDetailClicked(user: IUser): void {
    this.openUserDetail.emit(user);
  }
}
