import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = this._fb.nonNullable.group({
    dateRange: [
      [new Date('2019-03-11T08:00:00+11:00'), new Date('2019-03-11T15:00:00+11:00')] as [
        Date,
        Date,
      ],
    ],
  });

  constructor(private readonly _fb: FormBuilder) {
    // Workaround for "Multiple formControlName/formControl directives using the same FormControl do not stay in sync"
    // https://github.com/angular/angular/issues/51239
    // of "Two formControlName bound to same FormControl are not updated without ngModel"
    // https://github.com/angular/angular/issues/10036
    this.form.controls.dateRange.valueChanges.subscribe(v =>
      this.form.controls.dateRange.setValue(v, { emitEvent: false }),
    );
  }
}
