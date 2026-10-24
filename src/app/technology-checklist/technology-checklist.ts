import { Component } from '@angular/core';

// Structure of a technology item
interface Technology {
  name: string;
  layer: string;
  learned: boolean;
}

@Component({
  selector: 'app-technology-checklist',
  imports: [],
  templateUrl: './technology-checklist.html',
  styleUrl: './technology-checklist.css'
})
export class TechnologyChecklist {

  // MEAN-stack technologies used in the project
  technologies: Technology[] = [
    { name: 'MongoDB', layer: 'Database', learned: false },
    { name: 'Express.js', layer: 'Back End', learned: false },
    { name: 'Angular', layer: 'Front End', learned: true },
    { name: 'Node.js', layer: 'Back End', learned: false },
    { name: 'TypeScript', layer: 'Language', learned: true },
    { name: 'Angular Material', layer: 'Front End', learned: false }
  ];

  // Update an item when its checkbox changes
  toggleTechnology(tech: Technology, event: Event): void {
    tech.learned = (event.target as HTMLInputElement).checked;
  }

  // Count checked technologies
  get learnedCount(): number {
    return this.technologies.filter(t => t.learned).length;
  }
}
