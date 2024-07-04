export class SignInResponseDto {
  access_token: string;
  refresh_token: string;

  constructor(partial: Partial<SignInResponseDto>) {
    this.access_token = partial.access_token;
    this.refresh_token = partial.refresh_token;
  }
}
