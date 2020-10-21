import { Observable } from 'rxjs';

export type StorageCallback = (error: any, result: any) => void;

export abstract class StorageService {
    abstract initialize();
    abstract delete(id: string, options: unknown);
    abstract save<T>(doc: T, options: unknown);
    abstract get<T>(docId: string, options: unknown): Observable<T>;
    abstract find<T>(options: unknown): Observable<T[]>;
}