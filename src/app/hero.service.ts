import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { of, Observable } from "rxjs";
import { MessagesService } from "./messages.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>("api/heroes").pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError("getHeroes", []))
    );
  }

  getHero(id: number): Observable<Hero> {
    this.log(`fetched hero id=${id}`);
    console.log(`api/heroes/${id}`);

    return this.http.get<Hero>(`api/heroes/${id}`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>("getHero"))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  update(hero: Hero): Observable<any> {
    return this.http.put(`api/heroes`, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError("updateHero failed"))
    );
  }

  add(hero: Hero) {
    return this.http.post("api/heroes", hero, this.httpOptions).pipe(
      tap(_ => this.log(`added hero id=${hero.id}`)),
      catchError(this.handleError("addHero failed"))
    );
  }

  delete(hero: Hero) {
    return this.http.delete(`api/heroes/${hero.id}`).pipe(
      tap(_ => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError("deleteHero failed"))
    );
  }

  log(message: string) {
    this.messagesService.add(`HeroesService: ${message}`);
  }

  handleError<T>(operation: string, result?: T) {
    return (err: any): Observable<T> => {
      console.log(err);
      this.log(`${operation} failed: ${err.message}`);
      return of(result);
    };
  }
}
