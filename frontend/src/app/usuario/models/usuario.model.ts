export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface AtualizarPerfilRequest {
  nome: string;
  email: string;
  senhaAtual?: string;
  novaSenha?: string;
}
