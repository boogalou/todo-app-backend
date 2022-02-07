import { createTransport } from 'nodemailer';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.iterface';
import { IEmailService } from './email.service.interface';

@injectable()
export class EmailService implements IEmailService {
  private transporter;

  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {
    this.transporter = createTransport({
      host: String(this.configService.get('SMTP_HOST')),
      port: Number(this.configService.get('SMTP_PORT')),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      }
    })
  }

  async sendMailForActivation(to: string, link: string) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to,
      subject: `Activation account ${this.configService.get('API_URL')}`,
      text: '',
      html:
        `
        <div>
          <h1>Activate your account</h1>
          <a href=${ link }>${ link }</a>
        </div>
        
        `
    })
  }
}