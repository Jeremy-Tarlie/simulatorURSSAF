import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  private backendUrl = 'http://localhost:3000/api/simulator'; 

  async getSimulatorData(simulatorData: any): Promise<any> {
    try {
      const response = await axios.post(this.backendUrl, simulatorData);
      return response.data;
    } catch (error: any) {
      console.error('Erreur API backend :', error.message);
      throw new Error(error.response?.data || 'Erreur serveur');
    }
  }
}
