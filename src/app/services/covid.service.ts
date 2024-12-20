import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private backendUrl = 'http://localhost:3000/api/covid'; 

  async getCovidData(country = "France"): Promise<any> {
    try {
      const response = await axios.get(this.backendUrl);
      return response.data.find((data:any) => data.country === country);
    } catch (error: any) {
      console.error('Erreur API backend :', error.message);
      throw new Error(error.response?.data || 'Erreur serveur');
    }
  }
}
