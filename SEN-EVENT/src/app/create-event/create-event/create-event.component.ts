import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  steps = ['editer', 'banner', 'ticket', 'reviser'];
  currentStepIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateProgress(event.urlAfterRedirects);
      }
    });
  }

  updateProgress(url: string) {
    const step = this.steps.findIndex((step) => url.includes(step));
    this.currentStepIndex = step !== -1 ? step : 0;
  }
}
