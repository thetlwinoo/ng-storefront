import { BoxConfig } from '@box/types';

/**
 * Default Box Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

export const boxConfig: BoxConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: 'theme-default',
    customScrollbars: false,
    layout: {
        style: 'horizontal-layout-1',
        width: 'fullwidth',
        header: {
            hidden: false,
            position: 'top',
            background: 'box-white-500',
            custom: 'header-area theme-bg'
        },
        navbar: {
            primaryBackground: 'box-navy-500',
            secondaryBackground: 'box-navy-900',
            folded: false,
            hidden: false,
            position: 'top',
            variant: 'vertical-style-1'
        },
        toolbar: {
            customBackgroundColor: false,
            background: 'box-white-500',
            hidden: false,
            position: 'above'
        },
        footer: {
            customBackgroundColor: true,
            background: 'box-navy-900',
            hidden: false,
            position: 'above-fixed'
        },
        contentBelow: {
            customBackgroundColor: true,
            background: 'box-navy-900',
            hidden: false,
            position: 'below'
        },
        sidepanel: {
            hidden: false,
            position: 'right'
        }
    }
};
