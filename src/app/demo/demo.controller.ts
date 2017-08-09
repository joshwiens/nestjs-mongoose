import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';

import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(private demoService: DemoService) {}

  @Get('/')
  public async sayDemo(@Response() res) {
    const greetings = await this.demoService.sendDemoResponse();

    res.status(HttpStatus.OK).json(greetings);
  }
  @Get('/:user')
  public async sayDemoToSomeone(@Response() res, @Param('user') name) {
    const greetings = await this.demoService.sendDemoResponseUser(name);

    res.status(HttpStatus.OK).json(greetings);
  }
}
