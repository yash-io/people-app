import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService, Person } from '../people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  constructor(private peopleSvc: PeopleService, private router: Router) {}

  async ngOnInit() {
    this.peopleSvc.people$.subscribe(list => { if (list) this.people = list; });
    await this.peopleSvc.loadAll();
  }

  edit(id: any) { this.router.navigate(['/edit', id]); }
  del(id: any) { this.router.navigate(['/delete', id]); }
}
