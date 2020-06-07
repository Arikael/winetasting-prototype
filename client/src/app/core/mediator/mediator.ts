import { Observable } from 'rxjs';

export class MediatorParams {
    value: any;
}

export class MediatorResult {
    value: any;
    code: string;
}

export abstract class Mediator {
    abstract action(data: MediatorParams | null): Observable<MediatorResult> | void;
}
