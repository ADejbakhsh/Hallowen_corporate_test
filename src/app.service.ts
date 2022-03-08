/* eslint @typescript-eslint/no-var-requires: "off" */
import { Injectable } from '@nestjs/common';
import { SerpiGoogle } from './type';
import { add_str_at_nth_position_of_str } from './string_utile';
const axios = require('axios').default;

const serpiGoogle = 'https://serpapi.com/search.json?engine=google';

@Injectable()
export class AppService {
  // in case someone doesn't read the wiki
  welcome(): string {
    return '\
    This service allow you to get the phone number of a french company.<br>\
    To make a request use "/getFrenchCompanyNumber" path<br>\
    specify the name of the company and optionally the adress and siren.<br>\
    exemple : /getFrenchCompanyNumber?name=$company_name&adress=$adress&siren=$siren<br>\
    It will return the phone number of the company or an error message in Json format.';
  }

  /*
   * @param {string} name - name of the company
   * @param {string} siren - optional siren of the company
   * @param {string} adress - optional of the company
   * @return {string} - Phone number of the company or error message
   */
  async getFrenchCompanyNumber(
    name: string,
    adress = '',
    siren = '',
  ): Promise<object> {
    if (name === undefined || name === null)
      return { error: 'No name defined in request' };

    let request = `${serpiGoogle}&api_key=${process.env.SERP_API_KEY}&q=${name}`;

    if (adress !== '') request += `+${adress}`;

    let result: SerpiGoogle = await axios.get(`${request}`);

    if (!result.data?.knowledge_graph?.phone) {
      // try with siren if it exist otherwise return not found
      if (siren !== '') result = await axios.get(`${request}`);

      if (!result.data?.knowledge_graph?.phone)
        return { error: 'No phone number found' };
    }

    // format phone number as +33 xxxxxxxxx
    let phone_number = result.data.knowledge_graph.phone;
    phone_number = phone_number.replace(/ /g, '');
    phone_number = add_str_at_nth_position_of_str(phone_number, ' ', 3);

    return { phone: phone_number };
  }
}
