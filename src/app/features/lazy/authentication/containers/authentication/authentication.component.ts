import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  IConfigurationProperties,
  IdentityService,
  SettingsService,
} from 'src/app/core';
import { IAuthenticationForm } from '../../models';
import { ModuleInitService } from '../../services';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit {
  configuration$!: Observable<IConfigurationProperties | null>;
  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _settingsService: SettingsService,
    private _identityService: IdentityService,
    private _moduleInitService: ModuleInitService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this._settingsService.applicationConfiguration$;
    this._moduleInitService.initModule();

    this.form = this.createForm();
  }

  createForm(): FormGroup {
    const loginForm = new FormGroup({
      token: new FormControl<string>('', [Validators.required]),
    });

    return loginForm;
  }

  loginClicked(token: string, configuration: IConfigurationProperties): void {
    if (!token) {
      console.warn('Ups, missing token');
    }

    const redirectUrl: string[] = configuration?.identityConfiguration
      ?.redirectUrlAfterSuccessfulAuthentication
      ? configuration.identityConfiguration
          .redirectUrlAfterSuccessfulAuthentication
      : [];

    // Store auth token
    this._identityService.setAccessToken(token, redirectUrl);
  }
}
