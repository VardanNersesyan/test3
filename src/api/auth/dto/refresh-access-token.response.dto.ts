export class RefreshAccessTokenResponseDto {
  access_token: string;

  constructor(partial: Partial<RefreshAccessTokenResponseDto>) {
    this.access_token = partial.access_token;
  }
}
