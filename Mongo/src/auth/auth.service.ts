import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from "./jwt-payload.interface";


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredetialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredetialsDto);
  }
  async signIn(authCredetialsDto: AuthCredentialsDto): Promise <{accessToken:string}>{
    const username = await this.userRepository.validateUserPassword(
      authCredetialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken= await this.jwtService.sign(payload);
    return {accessToken};
  }
  
}
