import { Component } from '@angular/core';
import { EntrepriseService } from '../../../services/entreprise.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from "../../simulator/simulator.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, SimulatorComponent, SimulatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
}
