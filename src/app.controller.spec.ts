// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a short doc summary', () => {
      expect(appController.welcome().length).toEqual(385);
    });
  });

  // these test are dependente of google and if the entreprise is still open.
  // They are not future proof but they are good enough for a years or 2.
  describe('getFrenchCompanyNumber', () => {
    describe('when no name is provided', () => {
      it('should return an error message', async () => {
        expect(await appController.getFrenchCompanyNumber({})).toStrictEqual({
          error: 'No name defined in request',
        });
      });
    });
    describe('when invalide name is provided', () => {
      it('should return an error message', async () => {
        expect(
          await appController.getFrenchCompanyNumber({ name: 'invalide' }),
        ).toStrictEqual({ error: 'No phone number found' });
      });
    });
    describe('when valid name is provided', () => {
      it('should return the phone number of the company', async () => {
        expect(
          await appController.getFrenchCompanyNumber({
            name: 'SA LUBING INTERNATIONAL',
          }),
        ).toStrictEqual({ phone: '+33 321276068' });
      });
    });
    describe('when valid name and adress is provided', () => {
      it('should return the phone number of the company', async () => {
        expect(
          await appController.getFrenchCompanyNumber({
            name: 'CHINA ARTS',
            adress: '75010 PARIS',
          }),
        ).toStrictEqual({ phone: '+33 142068964' });
      });
    });
    describe('When valide name but invalid adress', () => {
      it('should return an error message', async () => {
        expect(
          await appController.getFrenchCompanyNumber({
            name: 'CHINA ARTS',
            adress: '999 Rue des miracles',
          }),
        ).toStrictEqual({ error: 'No phone number found' });
      });
    });
  });
});
