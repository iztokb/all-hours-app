import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbsenceFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
