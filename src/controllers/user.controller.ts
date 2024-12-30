import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { Response, Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/loginGoogle')
  async loginGoogle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const payloadData = await this.userService.loginGoogle(req.headers.authorization as string);
    if (payloadData) res.status(HttpStatus.OK).send(payloadData);
    else res.status(HttpStatus.UNAUTHORIZED).send();
  }
}
