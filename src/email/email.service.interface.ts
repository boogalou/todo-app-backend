

export interface IEmailService {
  sendMailForActivation: (to: string, link: string) => Promise<void>
}