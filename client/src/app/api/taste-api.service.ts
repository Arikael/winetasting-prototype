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
                        tasteCategory: 'earth',
                        name: 'beeswax',
                        color: ''
                    },
                    {
                        tasteCategory: 'earth',
                        name: 'ginger',
                        color: ''
                    },
                    {
                        tasteCategory: 'earth',
                        name: 'petroleum',
                        color: ''
                    },
                    {
                        tasteCategory: 'earth',
                        name: 'wetSlate',
                        color: ''
                    },
                    {
                        tasteCategory: 'earth',
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
                        tasteCategory: 'herbs',
                        name: 'jasmine',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
                        name: 'honeysuckle',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
                        name: 'vanilla',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
                        name: 'Nutmeg',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
                        name: 'cinnamon',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
                        name: 'whitePepper',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
                        name: 'thaiBasil',
                        color: ''
                    },
                    {
                        tasteCategory: 'herbs',
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
                        tasteCategory: 'citrus',
                        name: 'lime',
                        color: ''
                    },
                    {
                        tasteCategory: 'citrus',
                        name: 'lemon',
                        color: ''
                    },
                    {
                        tasteCategory: 'citrus',
                        name: 'citrusZest',
                        color: ''
                    },
                    {
                        tasteCategory: 'citrus',
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
                        tasteCategory: 'fruit',
                        name: 'greenApple',
                        color: ''
                    },
                    {
                        tasteCategory: 'fruit',
                        name: 'pear',
                        color: ''
                    },
                    {
                        tasteCategory: 'fruit',
                        name: 'cantaloupe',
                        color: ''
                    },
                    {
                        tasteCategory: 'fruit',
                        name: 'nectarine',
                        color: ''
                    },
                    {
                        tasteCategory: 'fruit',
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
                        tasteCategory: 'tropicalFruit',
                        name: 'starfruit',
                        color: ''
                    },
                    {
                        tasteCategory: 'tropicalFruit',
                        name: 'papaya',
                        color: ''
                    },
                    {
                        tasteCategory: 'tropicalFruit',
                        name: 'mango',
                        color: ''
                    },
                    {
                        tasteCategory: 'tropicalFruit',
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
                        tasteCategory: 'redFruit',
                        name: 'strawberry',
                        color: ''
                    },
                    {
                        tasteCategory: 'redFruit',
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
