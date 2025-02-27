import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reviser',
  templateUrl: './reviser.component.html',
  styleUrl: './reviser.component.css',
})
export class ReviserComponent implements OnInit {
  evenement: any = {};
  safeImageUrl: SafeUrl | null = null;

  constructor(
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const eventData = this.eventService.getEventData();
    if (eventData) {
      this.evenement = eventData;

      // Check if there is a media file and it's an image
      if (
        this.evenement.event?.media?.file &&
        this.evenement.event.media.type === 'image'
      ) {
        this.createImageUrl(this.evenement.event.media.file);
      }
    }
  }

  createImageUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        e.target.result
      );
    };
    reader.readAsDataURL(file);
  }
}
