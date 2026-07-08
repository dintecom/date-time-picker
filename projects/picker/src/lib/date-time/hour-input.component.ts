/**
 * hour-input.component
 */

import {
    Component,
    computed,
    forwardRef,
    inject,
    input,
    model
} from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OwlTimerBoxComponent } from './timer-box.component';

@Component({
    exportAs: 'owlHourInput',
    selector: 'owl-hour-input',
    templateUrl: './hour-input.component.html',
    imports: [OwlTimerBoxComponent],
    host: {
        '[class.owl-hour-input]': 'owlHourInputClass'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OwlHourInputComponent),
            multi: true
        }
    ]
})
export class OwlHourInputComponent implements ControlValueAccessor {
    private readonly pickerIntl = inject(OwlDateTimeIntl);

    readonly upBtnAriaLabel = input<string>(undefined);
    readonly downBtnAriaLabel = input<string>(undefined);
    readonly min = input(0);
    readonly max = input(23);
    readonly step = input(1);
    readonly hour12Timer = input<boolean>(undefined);

    readonly value = model<number>();
    readonly disabled = model<boolean>();

    protected readonly isPM = computed(() => {
        const hours = this.value();
        return hours >= 12 && hours <= 23;
    });

    protected readonly hour12ButtonLabel = computed(() =>
        this.isPM()
            ? this.pickerIntl.hour12PMLabel
            : this.pickerIntl.hour12AMLabel
    );

    protected readonly boxValue = computed(() => {
        const hours = this.value();

        if (!this.hour12Timer()) {
            return hours;
        }
        if (hours === 0) {
            return 12;
        }
        if (hours > 12 && hours < 24) {
            return hours - 12;
        }
        return hours;
    });

    get owlHourInputClass(): boolean {
        return true;
    }

    public upBtnClicked(): void {
        // Emits `valueChange` via the model; does not touch the forms value.
        this.value.set(this.value() + this.step());
    }

    public downBtnClicked(): void {
        this.value.set(this.value() - this.step());
    }

    public setValueViaInput(hours: number): void {
        if (this.value() && this.isPM() && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        } else if (this.value() && !this.isPM() && hours === 12) {
            hours = 0;
        }

        this.commitValue(hours);
    }

    public setValue(hours: number): void {
        if (hours < this.min()) {
            this.commitValue(this.max());
        } else if (hours > this.max()) {
            this.commitValue(this.min());
        } else {
            this.commitValue(hours);
        }
    }

    public setMeridian(): void {
        // Toggle AM/PM by shifting the hour by 12; `isPM` recomputes from value.
        const hours = this.value() + (this.isPM() ? -12 : 12);

        if (hours >= 0 && hours <= 23) {
            this.setValue(hours);
        }
    }

    /**
     * Update the value (which emits `valueChange` through the model) and notify
     * the forms API, mirroring the behaviour of the old value setter.
     */
    private commitValue(value: number): void {
        this.value.set(value);
        this.onChange(value);
        this.onTouch(value);
    }

    onChange: any = () => {};

    onTouch: any = () => {};

    writeValue(value: any) {
        this.value.set(value);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }
}
