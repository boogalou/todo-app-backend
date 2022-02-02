export interface ITokenService {

  generateToken: ({ email, name }: Record<string, string>) => Tokens;
  saveToken: (email: string, refreshToken: string) => void;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}