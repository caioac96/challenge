import { Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/reset')
  @HttpCode(200)
  reset() {
    this.appService.reset();
    return "OK"
  }
}
