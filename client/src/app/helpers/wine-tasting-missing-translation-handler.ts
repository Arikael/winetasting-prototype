import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class WineTastingMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return `{trans: missing key ${params.key}}`;
    }
}