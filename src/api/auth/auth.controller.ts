import {
  Body,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import {
  SignInRequestDto,
  SignUpRequestDto,
  SignUpResponseDto,
  SignInResponseDto,
  SignOutResponseDto,
  RefreshAccessTokenRequestDto,
} from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from '../../common/interfaces/request-with-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUp: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUp);
  }

  @Post('sign-in')
  async signIn(@Body() signIn: SignInRequestDto): Promise<SignInResponseDto> {
    return await this.authService.signIn(signIn);
  }

  @Get('refresh-access-token')
  async refreshAccessToken(@Query() refresh: RefreshAccessTokenRequestDto) {
    return await this.authService.refreshAccessToken(refresh);
  }

  @UseGuards(AuthGuard)
  @Get('sign-out')
  async signOut(@Request() req: RequestWithUser): Promise<SignOutResponseDto> {
    return this.authService.signOut(req.user);
  }
}
