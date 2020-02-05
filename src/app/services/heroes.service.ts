import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  PUBLIC_KEY = '459ab6d380a18939e9420cb20c95f070';
  URL_API = 'https://gateway.marvel.com:443/v1/public/characters';

  constructor(private http: HttpClient) { }

  getCharacters(text: string): Observable<any> {
    const url = `${ this.URL_API }?nameStartsWith=${ text }&apikey=${ this.PUBLIC_KEY }`;
    return this.http.get<any>(url)
      .pipe(map((data: any) => data.data['results']));
  }
}
