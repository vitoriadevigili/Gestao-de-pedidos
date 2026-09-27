import { HttpErrorResponse } from '@angular/common/http';
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
import { ApiErrorResponse } from '../../../core/models/api-error.model';
import { CadastroData } from '../../models/cadastro.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
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
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  private model = signal<CadastroData>({ nome: '', email: '', senha: '' });

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected form = form(
    this.model,
    (schema) => {
      required(schema.nome, { message: 'Nome deve ser informado' });
      required(schema.email, { message: 'E-mail deve ser informado' });
      email(schema.email, { message: 'E-mail deve ser válido' });
      required(schema.senha, { message: 'Senha deve ser informada' });
    },
    {
      submission: {
        action: async (field) => {
          const data = field().value();

          try {
            await firstValueFrom(this.authService.cadastrar(data));
            this.router.navigate(['/auth/login']);
            return;
          } catch (erro) {
            const corpo =
              erro instanceof HttpErrorResponse ? (erro.error as ApiErrorResponse) : undefined;

            if (corpo?.errors?.length) {
              const campos: Record<keyof CadastroData, typeof field.nome> = {
                nome: field.nome,
                email: field.email,
                senha: field.senha,
              };

              return corpo.errors.map((erroCampo) => ({
                fieldTree: campos[erroCampo.field as keyof CadastroData],
                kind: 'erroBackend',
                message: erroCampo.message,
              }));
            }

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail:
                corpo?.message ?? 'Não foi possível concluir o cadastro. Verifique os dados e tente novamente.',
            });
            return;
          }
        },
      },
    },
  );
}
