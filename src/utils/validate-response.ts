import {
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ResponseEntityV3 } from 'src/v3/entities/v3.entity';

import { parseHtmlAndCheckException } from './html-parser';

export const validateResponse = (data: ResponseEntityV3): void => {
  const logger = new Logger(validateResponse.name);

  /** Check if the message contains the word "Exception" */
  // If data.success is undefined then google script returns html data
  // We need to parse the html and check if the message contains the word "Exception"
  // example of this condition is when quota is exceeded
  if (data.success === undefined) {
    const exceptionMessage = parseHtmlAndCheckException(
      data as unknown as string,
    );

    if (exceptionMessage) {
      logger.error(exceptionMessage);
      throw new ServiceUnavailableException(exceptionMessage);
    }
  }

  if (data.success === false) {
    logger.error(data);
    throw new NotFoundException(data);
  }

  return;
};
