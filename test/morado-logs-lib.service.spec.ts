import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoradoLogs } from '../src';

describe('Morado Logs Service', () => {
  let moradoLogs: MoradoLogs;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoradoLogs,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    })
      .setLogger(new Logger())
      .compile();
    moradoLogs = module.get<MoradoLogs>(MoradoLogs);
    logger = module.get<Logger>(Logger);
  });

  describe('Print Logs', () => {
    it(`Given a log information with a string message,
    When the method is info 
    Then the service should be use de info method to print the information in console
    `, async () => {
      const expected = 'Info log';
      moradoLogs.info(expected);
      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(logger.log).toHaveBeenCalledWith(expected, undefined);
    });

    it(`Given a log information with a string message,
    When the method is debug 
    Then the service should be use de debug method to print the information in console
    `, async () => {
      const expected = 'Debug log';
      moradoLogs.debug(expected);
      expect(logger.debug).toHaveBeenCalledTimes(1);
      expect(logger.debug).toHaveBeenCalledWith(expected, undefined);
    });

    it(`Given a log information with a string message,
    When the method is error 
    Then the service should be use de error method to print the information in console
    `, async () => {
      const expected = 'Error log';
      moradoLogs.error(expected);
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith(expected, undefined);
    });
  });
});
