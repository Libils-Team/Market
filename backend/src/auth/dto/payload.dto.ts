import { ApiProperty } from '@nestjs/swagger';

export class PayloadUser {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpZCI6MSwiaWF0IjoxNjU4NDMyMzQwLCJleHAiOjE2NTg1MTg3NDB9.JWzAeCEu0Kynhg_UpNTWkT27egbKhkgvfKh6dKuWnGk',
  })
  readonly token: string;
}
