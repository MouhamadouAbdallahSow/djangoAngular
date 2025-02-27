import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrl: './editer.component.css',
})
export class EditerComponent implements OnInit {
  eventForm!: FormGroup;
  villes: string[] = []; // Stockera les villes correspondant à la région sélectionnée

  REGIONS_VILLES: { [key: string]: string[] } = {
    Dakar: ['Dakar', 'Guédiawaye', 'Pikine', 'Rufisque'],
    Thiès: ['Thiès', 'Mbour', 'Tivaouane'],
    'Saint-Louis': ['Saint-Louis', 'Dagana', 'Podor'],
    Ziguinchor: ['Ziguinchor', 'Bignona', 'Oussouye'],
    Kaolack: ['Kaolack', 'Guinguinéo', 'Nioro du Rip'],
    Fatick: ['Fatick', 'Foundiougne', 'Gossas'],
    Tambacounda: ['Tambacounda', 'Bakel', 'Koumpentoum'],
    Kédougou: ['Kédougou', 'Salemata', 'Saraya'],
    Kolda: ['Kolda', 'Vélingara', 'Médina Yoro Foulah'],
    Matam: ['Matam', 'Kanel', 'Ranérou'],
    Louga: ['Louga', 'Kébémer', 'Linguère'],
    Diourbel: ['Diourbel', 'Bambey', 'Mbacké'],
    Sédhiou: ['Sédhiou', 'Goudomp', 'Bounkiling'],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      titre: ['', Validators.required],
      categories: this.fb.array([]),
      date: ['', Validators.required],
      heure: ['', Validators.required],
      chronogramme: [''],
      region: ['', Validators.required],
      ville: ['', Validators.required],
      lieu_exact: ['', Validators.required],
      description: ['', Validators.required],
      slogan: [''],
      lien: [''],
      speakers: this.fb.array([]),
    });
    this.eventForm.get('region')?.valueChanges.subscribe((region) => {
      this.updateVilles(region);
    });
  }
  updateVilles(region: string) {
    this.villes = this.REGIONS_VILLES[region] || [];
    this.eventForm.get('ville')?.setValue('');
  }
  getRegions(): string[] {
    return Object.keys(this.REGIONS_VILLES);
  }
  get categories(): FormArray {
    return this.eventForm.get('categories') as FormArray;
  }

  get speakers(): FormArray {
    return this.eventForm.get('speakers') as FormArray;
  }

  addCategory(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.categories.push(this.fb.control(value));
    } else {
      const index = this.categories.controls.findIndex(
        (control) => control.value === value
      );
      this.categories.removeAt(index);
    }
  }

  addSpeaker() {
    this.speakers.push(
      this.fb.group({
        prenom: ['', Validators.required],
        nom: ['', Validators.required],
        fonction: ['', Validators.required],
        description: [''],
        photo: [''],
        instagram: [''],
        facebook: [''],
        twitter: [''],
        linkedin: [''],
      })
    );
  }

  removeSpeaker(index: number) {
    this.speakers.removeAt(index);
  }
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.speakers.at(index).patchValue({ photo: file.name });
    }
  }
  goBack() {
    window.history.back();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = {
        titre: this.eventForm.get('titre')?.value,
        categories: this.eventForm.get('categories')?.value,
        date: this.eventForm.get('date')?.value,
        heure: this.eventForm.get('heure')?.value,
        region: this.eventForm.get('region')?.value,
        ville: this.eventForm.get('ville')?.value,
        lieu_exact: this.eventForm.get('lieu_exact')?.value,
        description: this.eventForm.get('description')?.value,
        slogan: this.eventForm.get('slogan')?.value,
        lien: this.eventForm.get('lien')?.value,
        speakers: this.eventForm.get('speakers')?.value,
      };
      this.eventService.setEventData({
        ...this.eventService.getEventData(),
        event: eventData,
      });
      console.log('Données soumises:', this.eventService.getEventData());
      this.router.navigate(['../banner'], { relativeTo: this.route });
    } else {
      console.log('Erreurs de validation:', this.eventForm.errors);
      console.log('État des champs:');
      Object.keys(this.eventForm.controls).forEach((key) => {
        const control = this.eventForm.get(key);
        if (control?.invalid) {
          console.log(`Champ ${key} est invalide. Erreurs:`, control.errors);
        }
      });
      alert('Le formulaire est invalide.');
    }
  }
}
