/**
 * timer-box.component
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  afterNextRender,
  inject,
  input,
  output,
  viewChild
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { of, Subject, Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
    exportAs: 'owlDateTimeTimerBox',
    selector: 'owl-date-time-timer-box',
    templateUrl: './timer-box.component.html',
    styleUrls: ['./timer-box.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
    }
})

export class OwlTimerBoxComponent implements OnInit, OnDestroy {

    readonly showDivider = input(false);

    readonly upBtnAriaLabel = input<string>(undefined);

    readonly upBtnDisabled = input<boolean>(undefined);

    readonly downBtnAriaLabel = input<string>(undefined);

    readonly downBtnDisabled = input<boolean>(undefined);

    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     * */
    readonly boxValue = input<number>(undefined);

    readonly value = input<number>(undefined);

    readonly min = input<number>(undefined);

    readonly max = input<number>(undefined);

    readonly step = input(1);

    /** Whether the value goes from the max to the min and back */
    readonly wrap = input(false);

    /** Milliseconds to wait after typing before applying the value, 0 applies it at once */
    readonly inputDebounce = input(750);

    readonly inputLabel = input<string>(undefined);

    readonly valueChange = output<number>();

    readonly inputChange = output<number>();

    private inputStream = new Subject<string>();

    private inputStreamSub = Subscription.EMPTY;

    private hasFocus = false;

    /** Whether the user typed into the box: the typed text is shown as is until the focus leaves */
    private editing = false;

    private readonly injector = inject(Injector);

    get displayValue(): string {
        if (this.hasFocus && this.editing) {
            // Don't try to reformat the value that user is currently editing
            return this.valueInput().nativeElement.value;
        }

        const value = this.boxValue() || this.value();

        if (value === null || isNaN(value)) {
            return '';
        }

        return value < 10 ? '0' + value.toString() : value.toString();
    }

    get owlDTTimerBoxClass(): boolean {
        return true;
    }

    private readonly valueInput = viewChild<ElementRef<HTMLInputElement>>('valueInput');
    private onValueInputMouseWheelBind = this.onValueInputMouseWheel.bind(this);

    constructor() {
    }

    public ngOnInit() {
        this.inputStreamSub = this.inputStream.pipe(
            debounce(() => (this.inputDebounce() > 0 ? timer(this.inputDebounce()) : of(0)))
        ).subscribe(( val: string ) => {
            if (val) {
                const inputValue = coerceNumberProperty(val, 0);
                this.updateValueViaInput(inputValue);
            }
        });
        this.bindValueInputMouseWheel();
    }

    public ngOnDestroy(): void {
        this.unbindValueInputMouseWheel();
        this.inputStreamSub.unsubscribe();
    }

    /** With wrap, past the max goes to the min (59 → 0), otherwise carries over to the larger unit. */
    public upBtnClicked(): void {
        const value = this.stepBase + this.step();
        this.updateValue(this.wrap() && value > this.max() ? this.min() : value);
    }

    /** With wrap, past the min goes to the max (0 → 59), otherwise carries over to the larger unit. */
    public downBtnClicked(): void {
        const value = this.stepBase - this.step();
        this.updateValue(this.wrap() && value < this.min() ? this.max() : value);
    }

    public handleInputChange(val: string ): void {
        this.editing = true;
        this.inputStream.next(val);
    }

    public focusIn(): void {
        this.hasFocus = true;
    }

    public focusOut(value: string): void {
        this.hasFocus = false;
        this.editing = false;
        if (value) {
            const inputValue = coerceNumberProperty(value, 0);
            this.updateValueViaInput(inputValue);
        }
    }

    /** The value the arrows step from: the typed number while it is not applied yet */
    private get stepBase(): number {
        if (this.editing) {
            const typed = coerceNumberProperty(this.valueInput().nativeElement.value, NaN);
            if (typed >= this.min() && typed <= this.max()) {
                return typed;
            }
        }
        return this.value();
    }

    /** Applies the arrow buttons, keys or wheel: the box shows the new value even while focused */
    private updateValue( value: number ): void {
        this.editing = false;
        // Drop the typed text waiting for the debounce, the arrows already stepped from it
        this.inputStream.next('');
        this.valueChange.emit(value);
        if (this.hasFocus) {
            // Keep the new value selected, so typing replaces it
            afterNextRender(() => this.valueInput().nativeElement.select(), { injector: this.injector });
        }
    }

    private updateValueViaInput( value: number ): void {
        if (value > this.max() || value < this.min()) {
            return;
        }
        this.inputChange.emit(value);
    }

    private onValueInputMouseWheel( event: any ): void {
        event = event || window.event;
        const delta = event.wheelDelta || -event.deltaY || -event.detail;

        if (delta > 0) {
          if (!this.upBtnDisabled()) {
            this.upBtnClicked();
          }
        } else if (delta < 0) {
          if (!this.downBtnDisabled()) {
            this.downBtnClicked();
          }
        }

        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    }

    private bindValueInputMouseWheel(): void {
        this.valueInput().nativeElement.addEventListener(
            'onwheel' in document ? 'wheel' : 'mousewheel',
            this.onValueInputMouseWheelBind);
    }

    private unbindValueInputMouseWheel(): void {
        this.valueInput().nativeElement.removeEventListener(
            'onwheel' in document ? 'wheel' : 'mousewheel',
            this.onValueInputMouseWheelBind);
    }
}
