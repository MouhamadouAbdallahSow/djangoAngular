import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-banniere',
  templateUrl: './banniere.component.html',
  styleUrl: './banniere.component.css',
})
export class BanniereComponent {
  mediaForm: FormGroup;
  selectedMediaType = 'image';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.mediaForm = this.fb.group({
      mediaType: ['image', Validators.required],
      mediaFile: [null, Validators.required],
    });
  }

  onMediaTypeChange(event: any) {
    this.selectedMediaType = event.target.value;
    this.mediaForm.get('mediaFile')?.setValue(null);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mediaForm.get('mediaFile')?.setValue(file);
    }
  }
  goBack() {
    window.history.back();
  }
  onSubmit() {
    if (this.mediaForm.valid) {
      const eventBannerData = {
        ...this.eventService.getEventData().event,
        media: {
          type: this.mediaForm.value.mediaType,
          file: this.mediaForm.value.mediaFile,
        },
      };
      this.eventService.setEventData({
        ...this.eventService.getEventData(),
        event: eventBannerData,
      });
      console.log('Formulaire soumis', this.mediaForm.value);
      this.router.navigate(['../ticket'], { relativeTo: this.route });
    } else {
      alert('Veuillez sélectionner un fichier.');
    }
  }
}
