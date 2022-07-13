import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ITheme } from 'src/app/core';
import { ModuleInitService } from '../../services';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitchComponent implements OnInit {
  /**
   * OUTPUTS
   */
  /**
   * @description
   * Emitted when user clicks theme switch
   */
  @Output()
  switchTheme: EventEmitter<ITheme> = new EventEmitter<ITheme>();

  /**
   * INPUTS
   */

  /**
   * @description
   * Current theme
   */
  private _currentTheme!: ITheme;
  @Input()
  set currentTheme(value: ITheme) {
    this._currentTheme = value;
  }
  get currentTheme() {
    return this._currentTheme;
  }

  /**
   * @description
   * Next available theme
   */
  private _nextTheme!: ITheme;
  @Input()
  set nextTheme(value: ITheme) {
    this._nextTheme = value;
  }
  get nextTheme() {
    return this._nextTheme;
  }
  constructor(private _moduleInitService: ModuleInitService) {}

  ngOnInit(): void {
    this._moduleInitService.initModule();
  }

  themeSwitchClicked(nextTheme: ITheme, currentTheme: ITheme): void {
    this.switchTheme.emit(nextTheme);
  }
}
