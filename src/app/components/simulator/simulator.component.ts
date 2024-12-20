import { Component } from '@angular/core';
import { EntrepriseService } from '../../services/entreprise.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

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
  ca: number = 0;
  nature: string = '';
  reglementee: string = '';
  categorieJuridique: string = '';
  autoEntrepreneur: string = '';
  versementLiberatoire: string = '';
  methodeCalculImpot: string = 'IR';

  constructor(private entrepriseService: EntrepriseService) {}

  async onSubmit() {
    try {
      let simulationParams = {};

      if (this.typeWork === 'salarié') {
        this.result = null;
        simulationParams = {
          situation: {
            'salarié . contrat . salaire brut': {
              valeur: this.salaireBrut,
              unité: this.salaireUnite,
            },
            'salarié . contrat': `'${this.contratType}'`,
          },
          expressions: ['salarié . rémunération . net . à payer avant impôt'],
        };
      } else {
        this.result = null;
        simulationParams = {
          situation: {
            "dirigeant . auto-entrepreneur . chiffre d'affaires": `${this.ca} €/an`,
            'entreprise . activité . nature': `'${this.nature}'`,
            'entreprise . activité . nature . libérale . réglementée':
              this.reglementee,
            'entreprise . catégorie juridique': `'${this.categorieJuridique}'`,
            'entreprise . catégorie juridique . EI . auto-entrepreneur':
              this.autoEntrepreneur,
            'dirigeant . auto-entrepreneur . impôt . versement libératoire':
              this.versementLiberatoire,
            'impôt . méthode de calcul': `'${this.methodeCalculImpot}'`,
          },
          expressions: [
            {
              valeur:
                'dirigeant . auto-entrepreneur . cotisations et contributions',
              unité: '€/an',
            },
            'dirigeant . rémunération . impôt',
            'dirigeant . auto-entrepreneur . revenu net . après impôt',
          ],
        };
      }

      const r = await this.entrepriseService.getSimulatorData(simulationParams);

      this.result = Number(
        calculerImpot(r.evaluate[0].nodeValue * 12).toFixed(2)
      );
    } catch (err: any) {
      console.error('Erreur lors de la simulation :', err.message);
    }
  }

  async downloadPdf() {
    const doc = new jsPDF();

    doc.setFontSize(18).text('Simulation de votre impot', 10, 10);
    doc
      .setFontSize(12)
      .text(
        `Vous avez un salaire annuel de ${
          this.salaireBrut
            ? this.salaireUnite.trim() === '€/mois' || this.salaireUnite.trim() === '/mois'
              ? this.salaireBrut * 12
              : this.salaireBrut
            : this.ca
        }€`,
        10,
        20
      );

    doc.text(`Les impots que vous allez payer est de ${this.result}€`, 10, 50);

    doc.save('simulator.pdf');
  }
}

function calculerImpot(revenuAnnuel: number): number {
  const tranches = [
    { plafond: 10777, taux: 0 },
    { plafond: 27478, taux: 0.11 },
    { plafond: 78570, taux: 0.3 },
    { plafond: 168994, taux: 0.41 },
    { plafond: Infinity, taux: 0.45 },
  ];

  let revenuImposable = revenuAnnuel;
  let impot = 0;

  for (let i = 0; i < tranches.length; i++) {
    const tranche = tranches[i];
    const tranchePrecedente = tranches[i - 1] ? tranches[i - 1].plafond : 0;

    if (revenuImposable > tranche.plafond) {
      impot += (tranche.plafond - tranchePrecedente) * tranche.taux;
    } else {
      impot += (revenuImposable - tranchePrecedente) * tranche.taux;
      break;
    }
  }

  return impot;
}
