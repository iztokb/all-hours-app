import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
