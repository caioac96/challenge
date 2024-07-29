import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fs = require('fs');

@Injectable()
export class AppService {
  async reset() {
    try {
      fs.writeFileSync('./src/fakedatabase.txt', '');
      fs.writeFileSync('./src/fakedatabase.txt', 'accounts');
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
