import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TasteCategory } from '../wine/models/taste-category';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TasteApiService {
    getTasteCatgories(...grapes: string[]): Observable<TasteCategory[]> {
       return of([
            {
                name: 'earth',
                color: '',
                tastes: [
                    {
                        name: 'beeswax',
                        color: ''
                    },
                    {
                        name: 'ginger',
                        color: ''
                    },
                    {
                        name: 'petroleum',
                        color: ''
                    },
                    {
                        name: 'wetSlate',
                        color: ''
                    },
                    {
                        name: 'chalk',
                        color: ''
                    }
                ]
            },
            {
                name: 'herbs',
                color: '',
                tastes: [
                    {
                        name: 'jasmine',
                        color: ''
                    },
                    {
                        name: 'honeysuckle',
                        color: ''
                    },
                    {
                        name: 'vanilla',
                        color: ''
                    },
                    {
                        name: 'Nutmeg',
                        color: ''
                    },
                    {
                        name: 'cinnamon',
                        color: ''
                    },
                    {
                        name: 'whitePepper',
                        color: ''
                    },
                    {
                        name: 'thaiBasil',
                        color: ''
                    },
                    {
                        name: 'rosemary',
                        color: ''
                    }
                ]
            },
            {
                name: 'citrus',
                color: '',
                tastes: [
                    {
                        name: 'lime',
                        color: ''
                    },
                    {
                        name: 'lemon',
                        color: ''
                    },
                    {
                        name: 'citrusZest',
                        color: ''
                    },
                    {
                        name: 'pinkGrapefruit',
                        color: ''
                    }
                ]
            },
            {
                name: 'fruit',
                color: '',
                tastes: [
                    {
                        name: 'greenApple',
                        color: ''
                    },
                    {
                        name: 'pear',
                        color: ''
                    },
                    {
                        name: 'cantaloupe',
                        color: ''
                    },
                    {
                        name: 'nectarine',
                        color: ''
                    },
                    {
                        name: 'apricot',
                        color: ''
                    }
                ]
            },
            {
                name: 'tropicalFruit',
                color: '',
                tastes: [
                    {
                        name: 'starfruit',
                        color: ''
                    },
                    {
                        name: 'papaya',
                        color: ''
                    },
                    {
                        name: 'mango',
                        color: ''
                    },
                    {
                        name: 'guava',
                        color: ''
                    }
                ]
            },
            {
                name: 'redFruit',
                color: '',
                tastes: [
                    {
                        name: 'strawberry',
                        color: ''
                    },
                    {
                        name: 'cherry',
                        color: ''
                    }
                ]
            }
        ]).pipe(map((item) => {
            return item;
        }));
    }
}
