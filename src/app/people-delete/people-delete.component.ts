import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person } from '../people.service';

@Component({
  selector: 'app-people-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-delete.component.html',
  styleUrl: './people-delete.component.css'
})
export class PeopleDeleteComponent {
  person?: Person;
  constructor(private route: ActivatedRoute, private peopleSvc: PeopleService, private router: Router) {
    this.init();
  }

  private async init() {
    const id = this.route.snapshot.paramMap.get('id')!;
    await this.peopleSvc.loadAll();
    this.person = this.peopleSvc.getLocalPerson(id);
  }

  async confirm() {
    if (this.person) {
      const id = this.person._id || this.person.id;
      if (id) await this.peopleSvc.deletePerson(String(id));
      this.router.navigate(['/people']);
    }
  }

  cancel() { this.router.navigate(['/people']); }
}
