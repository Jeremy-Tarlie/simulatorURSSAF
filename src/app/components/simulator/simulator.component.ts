import { Component } from '@angular/core';
import { EntrepriseService } from '../../services/entreprise.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulator',
  imports: [FormsModule, CommonModule],
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent {
  typeWork: string = ''; 
  salaireBrut: number = 0; 
  salaireUnite: string = '€/mois';
  contratType: string = 'CDI';
  result: any = null; 

  constructor(private entrepriseService: EntrepriseService) {}

  async onSubmit() {
    try {
      const simulationParams = {
        situation: {
          'salarié . contrat . salaire brut': {
            valeur: this.salaireBrut,
            unité: this.salaireUnite,
          },
          'salarié . contrat': `'${this.contratType}'`,
        },
        expressions: ['salarié . rémunération . net . à payer avant impôt'],
      };

      console.log(simulationParams);
      this.result = await this.entrepriseService.getSimulatorData(
        simulationParams
      );
      console.log(this.result);
    } catch (err: any) {
      console.error('Erreur lors de la simulation :', err.message);
    }
  }
}
