import { Injectable } from '@nestjs/common';
import { SerpiGoogle } from './type';
const axios = require('axios').default;

const serpiGoogle = 'https://serpapi.com/search.json?engine=google';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /*
   * @param {string} name - name of the company
   * @param {string} siren - optional siren of the company
   * @param {string} address - optional of the company
   * @return {string} - Phone number of the company or error message
   */
  async getFrenchCompanyNumber(name: string,adress: string = '',siren: string = ''): Promise<string> {

    if (name === undefined || name === null)
      return 'error No name defined in request';

    let request = `${serpiGoogle}&api_key=${process.env.SERP_API_KEY}&q=${name}`;

    // si une adresse est précisée
    if (adress !== '')
      request += `+${adress}`;

    let result : SerpiGoogle = await axios.get(`${request}`);

    // il doit y avoir un moyen plus simple de check cette condition
    if (!result.data?.knowledge_graph?.phone)
      {
        // try with siren if it exist otherwise return not found
        if (siren !== ''){
          result = await axios.get(`${request}`);
        }
        if (!result.data?.knowledge_graph?.phone)
          return 'error: No phone number found';
      }

    return result.data.knowledge_graph.phone;
  }
}
