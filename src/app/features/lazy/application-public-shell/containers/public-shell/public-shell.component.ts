import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-shell',
  templateUrl: './public-shell.component.html',
  styleUrls: ['./public-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
