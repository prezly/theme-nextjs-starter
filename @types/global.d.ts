import type { PrezlyEnv } from '@prezly/theme-kit-nextjs';

declare global {
    export namespace NodeJS {
        export interface ProcessEnv extends PrezlyEnv {}
    }
}
