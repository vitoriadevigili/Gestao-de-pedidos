package com.app.auth.security;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenRevogadoService {

    private final Map<String, Date> tokensRevogados = new ConcurrentHashMap<>();

    public void revogar(String token, Date expiracao) {
        removerExpirados();
        tokensRevogados.put(token, expiracao);
    }

    public boolean estaRevogado(String token) {
        return tokensRevogados.containsKey(token);
    }

    private void removerExpirados() {
        Date agora = new Date();
        tokensRevogados.values().removeIf(expiracao -> expiracao.before(agora));
    }
}
