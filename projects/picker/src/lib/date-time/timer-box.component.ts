import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';

@Component({
  exportAs: 'owlDateTimeTimerBox',
  selector: 'owl-date-time-timer-box',
  templateUrl: './timer-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
  },
  providers: [NumberFixedLenPipe]
})
export class OwlTimerBoxComponent implements OnInit, OnDestroy {
  @Input() showDivider = false;

  @Input() upBtnAriaLabel: string;

  @Input() upBtnDisabled: boolean;

  @Input() downBtnAriaLabel: string;

  @Input() downBtnDisabled: boolean;

  /**
   * Value would be displayed in the box
   * If it is null, the box would display [value]
   */
  @Input() boxValue: number;

  @Input() value: number;

  @Input() min: number;

  @Input() max: number;

  @Input() step = 1;

  @Input() inputLabel: string;

  @Output() valueChange = new EventEmitter<number>();

  @Output() inputChange = new EventEmitter<number>();

  private inputStream = new Subject<string>();

  private inputStreamSub = Subscription.EMPTY;

  private stringValue = '';

  private editMode = false;

  constructor(private readonly numberFixedLen: NumberFixedLenPipe) {}

  get displayValue(): string {
    if (this.editMode) return this.stringValue;
    return '' + this.numberFixedLen.transform(this.boxValue || this.value, 2);
  }

  get owlDTTimerBoxClass(): boolean {
    return true;
  }

  public ngOnInit() {
    this.inputStreamSub = this.inputStream.subscribe((val: string) => {
      if (val) {
        const inputValue = coerceNumberProperty(val, 0);
        this.updateValueViaInput(inputValue);
      }
    });
  }

  public ngOnDestroy(): void {
    this.inputStreamSub.unsubscribe();
  }

  public upBtnClicked(): void {
    let newValue = this.value + this.step;
    if (newValue > this.max) {
      newValue = this.min;
    }
    this.updateValue(newValue);
  }

  public downBtnClicked(): void {
    let newValue = this.value - this.step;
    if (newValue < this.min) {
      newValue = this.max;
    }
    this.updateValue(newValue);
  }

  public handleInputChange(value: string): void {
    this.stringValue = value;
    this.inputStream.next(value);
  }

  public focusIn() {
    this.editMode = true;
    this.stringValue = '' + this.numberFixedLen.transform(this.boxValue || this.value, 2);
  }

  public focusOut(value: string): void {
    this.editMode = false;
    if (value) {
      const inputValue = coerceNumberProperty(value, 0);
      this.updateValueViaInput(inputValue);
    }
  }

  public handleWheelChange(event: WheelEvent) {
    const deltaY = event.deltaY;
    if (deltaY > 0 && !this.upBtnDisabled) {
      this.downBtnClicked();
    } else if (deltaY < 0 && !this.downBtnDisabled) {
      this.upBtnClicked();
    }
  }

  private updateValue(value: number): void {
    this.stringValue = '' + this.numberFixedLen.transform(value, 2);
    this.valueChange.emit(value);
  }

  private updateValueViaInput(value: number): void {
    if (value > this.max || value < this.min) {
      return;
    }
    this.inputChange.emit(value);
  }
}
