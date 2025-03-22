import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger = new Logger('app service');

  getHello(): string {
    return 'Hello World!';
  }
}
