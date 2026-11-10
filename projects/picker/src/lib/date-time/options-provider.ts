import { InjectionToken, Provider } from '@angular/core';

export function defaultOptionsFactory() {
    return DefaultOptions.create();

}
export function multiYearOptionsFactory(options: Options) {
    return options.multiYear;
  }

export interface Options {
    multiYear: {
        yearsPerRow: number,
        yearRows: number
    };
    /** Default of the lazyValidation input of owl-date-time */
    lazyValidation: boolean;
    /** Default of the strictFormat input of input[owlDateTime] */
    strictFormat: boolean;
    /** Default of the wrapTimer input of owl-date-time and owl-date-time-inline */
    wrapTimer: boolean;
}
export class DefaultOptions {
    public static create(): Options {
        // Always return new instance
        return {
            multiYear: {
                yearRows: 7,
                yearsPerRow: 3
            },
            lazyValidation: false,
            strictFormat: false,
            wrapTimer: false
        };
    }
}

export abstract class OptionsTokens {
    public static all = new InjectionToken<Options>('All options token');
    public static multiYear = new InjectionToken<Options['multiYear']>('Grid view options token');
}

export const optionsProviders: Provider[] = [
    {
        provide: OptionsTokens.all,
        useFactory: defaultOptionsFactory,
    },
    {
        provide: OptionsTokens.multiYear,
        useFactory: multiYearOptionsFactory,
        deps: [OptionsTokens.all],
    },
];
