import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export interface Person {
  _id?: string; // from MongoDB
  name: string;
  age: number;
  gender?: string;
  mobile?: string;
  id?: number; // legacy local id
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private _people$ = new BehaviorSubject<Person[] | null>(null);
  people$ = this._people$.asObservable();
  private base = 'https://crud-api-olive.vercel.app';
  private endpoint = this.base + '/person';

  constructor(private http: HttpClient) {}

  async loadAll(force = false) {
    if (!force && this._people$.value) return;
    const data = await firstValueFrom(this.http.get<Person[]>(this.endpoint));
    this._people$.next(data);
  }

  getLocalPerson(idOrMongo: string) {
    const list = this._people$.value || [];
    return list.find(p => p._id === idOrMongo || (p.id && String(p.id) === String(idOrMongo)));
  }

  async updatePerson(p: Person) {
    if (!p._id) throw new Error('Missing _id');
    const updated = await firstValueFrom(this.http.put<Person>(`${this.endpoint}/${p._id}`, p));
    const list = (this._people$.value || []).map(x => (x._id === updated._id ? updated : x));
    this._people$.next(list);
  }

  async deletePerson(idOrMongo: string) {
    await firstValueFrom(this.http.delete(`${this.endpoint}/${idOrMongo}`));
    const list = (this._people$.value || []).filter(x => x._id !== idOrMongo && String(x.id) !== String(idOrMongo));
    this._people$.next(list);
  }
}
// -import { PeopleListComponent } from './people-list/people-list.component';