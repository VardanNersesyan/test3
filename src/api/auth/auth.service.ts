import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../../config';
import { JWTPayload } from './common/interfaces';
import { UserService } from '../user/user.service';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { RefreshAccessTokenRequestDto } from './dto/refresh-access-token.request.dto';
import { SignOutRequestDto } from './dto/sign-out.request.dto';
import { SignOutResponseDto } from './dto/sign-out.response.dto';
import { RefreshAccessTokenResponseDto } from './dto/refresh-access-token.response.dto';
import { UserRepository } from '../user/user.repository';
import { SignUpResponseDto } from './dto/sign-up.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private appConfigService: AppConfigService,
    private userRepository: UserRepository,
  ) {}

  async createAccessToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.appConfigService.jwtAccessTokenSecret,
      expiresIn: this.appConfigService.jwtAccessTokenExpiration,
    });
  }

  async createRefreshToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.appConfigService.jwtRefreshTokenSecret,
      expiresIn: this.appConfigService.jwtRefreshTokenExpiration,
    });
  }

  async signUp(signUp: SignUpRequestDto): Promise<SignUpResponseDto> {
    const hashPassword = await bcrypt.hash(signUp.password, 10);
    await this.userService.create({
      ...signUp,
      password: hashPassword,
    });

    return new SignUpResponseDto({ success: true });
  }

  async signIn(signIn: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userRepository.findByEmail(signIn.email);

    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    const isPasswordValid = await bcrypt.compare(
      signIn.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(['Invalid password']);
    }

    const payload = { email: user.email, sub: user.id };

    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(payload),
      this.createRefreshToken(payload),
    ]);

    user.refreshToken = refreshToken;
    await user.save();

    return new SignInResponseDto({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  async refreshAccessToken(
    refresh: RefreshAccessTokenRequestDto,
  ): Promise<RefreshAccessTokenResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(refresh.refreshToken, {
        secret: this.appConfigService.jwtRefreshTokenSecret,
      });

      const user = await this.userRepository.findById(payload.sub);

      if (user.refreshToken !== refresh.refreshToken) {
        throw new UnauthorizedException(['Unauthorized']);
      }

      const newAccessToken = await this.createAccessToken({
        email: user.email,
        sub: user.id,
      });

      return new RefreshAccessTokenResponseDto({
        access_token: newAccessToken,
      });
    } catch {
      throw new UnauthorizedException(['Unauthorized']);
    }
  }

  async signOut(signOut: SignOutRequestDto): Promise<SignOutResponseDto> {
    return await this.userService.clearUserRefreshToken(signOut.id);
  }
}
