import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticketForm: FormGroup;
  eventType: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.ticketForm = this.fb.group({
      ticketName: ['', Validators.required],
      ticketPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  selectEventType(type: string) {
    this.eventType = type;
    if (type === 'gratuit') {
      this.ticketForm.patchValue({
        ticketName: 'Gratuit',
        ticketPrice: '0',
      });
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const ticketData = {
        type: this.eventType,
        name: this.ticketForm.value.ticketName,
        price: this.ticketForm.value.ticketPrice,
      };
      this.eventService.setEventData({
        ...this.eventService.getEventData(),
        ticket: ticketData,
      });
      console.log('Formulaire envoyé :', this.ticketForm.value);
      this.router.navigate(['../reviser'], { relativeTo: this.route });
    } else {
      alert('Veuillez sélectionner un type de ticket.');
    }
  }

  goBack() {
    window.history.back();
  }
}
