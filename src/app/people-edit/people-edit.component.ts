import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person } from '../people.service';

@Component({
  selector: 'app-people-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './people-edit.component.html',
  styleUrl: './people-edit.component.css'
})
export class PeopleEditComponent {
  person?: Person;
  model: Partial<Person> = {};

  constructor(private route: ActivatedRoute, private peopleSvc: PeopleService, public router: Router) {
    this.init();
  }

  private async init() {
    const id = this.route.snapshot.paramMap.get('id')!;
    await this.peopleSvc.loadAll();
    const p = this.peopleSvc.getLocalPerson(id);
    if (p) { this.person = p; this.model = { ...p }; }
  }

  async save() {
    if (this.person && this.model.name && this.model.age != null) {
      const updated: Person = { ...this.person, ...this.model } as Person;
  await this.peopleSvc.updatePerson(updated);
      this.router.navigate(['/people']);
    }
  }
}
