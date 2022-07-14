import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IRoutableModule, RoutableItemType } from 'src/app/core';

@Component({
  selector: 'app-routable-item',
  templateUrl: './routable-item.component.html',
  styleUrls: ['./routable-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutableItemComponent implements OnInit {
  /**
   * OUTPUTS
   */

  /**
   * INPUTS
   */
  /**
   * @description
   * Routable item
   */
  @Input() container!: IRoutableModule;

  /**
   * @description
   * Component mode. It is either SIDE_NAV or SIDE_MENU. It defaults to SIDE_NAV
   */
  @Input() mode: RoutableItemType = 'SIDE_NAV';
  constructor() {}

  ngOnInit(): void {}
}
