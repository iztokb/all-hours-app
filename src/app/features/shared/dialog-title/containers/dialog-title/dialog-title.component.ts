import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dialog-title',
  templateUrl: './dialog-title.component.html',
  styleUrls: ['./dialog-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTitleComponent implements OnInit {
  /**
   * OUTPUTS
   */
  /**
   * @description
   * Emitted when user clicks close dialog button
   */
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @description
   * Emitted when user clicks minimize button
   */
  @Output() minimizeDialog: EventEmitter<void> = new EventEmitter<void>();

  /**
   * INPUTS
   */
  /**
   * @description
   * Close dialog command tooltip
   */
  @Input() closeDialogTooltip: string = '';

  /**
   * @description
   * Enable dragging. Defaults to false
   */
  @Input() enableDrag: boolean = false;

  /**
   * @description
   * Enable drag command tooltip
   */
  @Input() enableDragTooltip: string = '';

  /**
   * @description
   * Enable minimizing. Defaults to false
   */
  @Input() enableMinimize: boolean = false;

  /**
   * @description
   * Enable minimize command tooltip
   */
  @Input() enableMinimizeTooltip: string = '';

  /**
   * @description
   * Dialog icon. Defaults to crop_din
   */
  @Input() icon: string = 'crop_din';

  /**
   * @description
   * Dialog icon tooltip. Defaults to empty string
   */
  @Input() iconTooltip: string = '';

  /**
   * @description
   * Record identifier. Defaults to empty string
   */
  @Input() recordId: string = '';

  /**
   * @description
   * Sticky header
   */
  @Input() stickyHeader: boolean = false;

  /**
   * @description
   * Dialog title
   */
  @Input() title: string | undefined = '';

  /**
   * OTHER PROPS
   */

  constructor() {}

  ngOnInit(): void {}

  closeClicked(): void {
    this.closeDialog.emit();
  }

  minimizeClicked(): void {
    this.minimizeDialog.emit();
  }
}
