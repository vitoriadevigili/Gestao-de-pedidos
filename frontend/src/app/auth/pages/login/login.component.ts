import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { firstValueFrom } from 'rxjs';
import { LoginData } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ButtonDirective,
    CardModule,
    InputTextModule,
    LabelModule,
    MessageModule,
    PasswordModule,
    FormField,
    FormRoot,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private model = signal<LoginData>({ email: '', senha: '' });

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected form = form(
    this.model,
    (schema) => {
      required(schema.email, { message: 'E-mail deve ser informado' });
      email(schema.email, { message: 'E-mail deve ser válido' });
      required(schema.senha, { message: 'Senha deve ser informada' });
    },
    {
      submission: {
        action: async (field) => {
          const data = field().value();

          try {
            const response = await firstValueFrom(this.authService.login(data));
            this.authService.salvarToken(response.token);
            this.router.navigateByUrl('/');
            return;
          } catch {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'E-mail ou senha inválidos',
            });
            return;
          }
        },
      },
    },
  );
}
