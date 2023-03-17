import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class EmailService {
  private googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
  private googleClientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
  private googleOauthRedirectUrl = this.configService.get<string>('GOOGLE_CLIENT_REDIRECT_URL');
  private googleRefreshToken = this.configService.get<string>('GOOGLE_REFRESH_TOKEN');
  private serviceEmail = this.configService.get<string>('SERVICE_EMAIL');

  private oauth2Client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.oauth2Client = new google.auth.OAuth2(
      this.googleClientId,
      this.googleClientSecret,
      this.googleOauthRedirectUrl,
    );
  }

  async sendEmail(userEmail: string, payload: string): Promise<void> {
    this.oauth2Client.setCredentials({ refresh_token: this.googleRefreshToken });
    // Access tokens expire. This library will automatically use a refresh token to obtain a new access token if it is about to expire.
    const { token: accessToken } = await this.oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.serviceEmail,
        clientId: this.googleClientId,
        clientSecret: this.googleClientSecret,
        refreshToken: this.googleRefreshToken,
        accessToken,
      },
    });

    await smtpTransport.sendMail({
      from: this.serviceEmail,
      to: userEmail,
      subject: 'Currency conversion rate',
      html: `<p>${payload}</p>`,
    });
  }
}
