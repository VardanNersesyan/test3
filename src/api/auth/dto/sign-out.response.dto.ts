export class SignOutResponseDto {
  success: boolean;

  constructor(partial: Partial<SignOutResponseDto>) {
    this.success = partial.success;
  }
}
