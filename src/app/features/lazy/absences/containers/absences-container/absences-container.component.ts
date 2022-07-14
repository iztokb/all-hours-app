import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-absences-container',
  templateUrl: './absences-container.component.html',
  styleUrls: ['./absences-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsencesContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
