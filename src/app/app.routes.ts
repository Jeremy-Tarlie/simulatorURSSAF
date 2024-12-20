import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { CovidComponent } from './components/covid/covid.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'covid', component: CovidComponent },
  { path: '**', redirectTo: '/home' }
];
