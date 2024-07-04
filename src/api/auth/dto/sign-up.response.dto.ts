export class SignUpResponseDto {
  success: boolean;

  constructor(partial: Partial<SignUpResponseDto>) {
    this.success = partial.success;
  }
}
