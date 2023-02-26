import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  info(): object {
    return {
      message: 'test-fasters'
    };
  }
}
