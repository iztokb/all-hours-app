import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-empty-view',
  templateUrl: './empty-view.component.html',
  styleUrls: ['./empty-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyViewComponent implements OnInit {
  /**
   * OUTPUTS
   */

  /**
   * INPUTS
   */
  /**
   * @description
   * Explanation text
   */
  @Input() explanation: string = '';

  /**
   * @description
   * Icon used
   */
  @Input() icon: string = '';

  /**
   * @description
   * Component title
   */
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
