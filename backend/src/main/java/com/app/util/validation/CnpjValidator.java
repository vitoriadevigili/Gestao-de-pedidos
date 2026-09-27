package com.app.util.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Valida CNPJ nos formatos numérico (legado) e alfanumérico (novo formato da
 * Receita Federal), ambos com 12 caracteres base (0-9, A-Z) seguidos de 2
 * dígitos verificadores numéricos.
 */
public class CnpjValidator implements ConstraintValidator<Cnpj, String> {

    private static final int[] PESOS_DV1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
    private static final int[] PESOS_DV2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

    @Override
    public boolean isValid(String cnpj, ConstraintValidatorContext context) {
        if (cnpj == null || cnpj.isBlank()) {
            return true;
        }

        String normalizado = cnpj.toUpperCase();
        if (!normalizado.matches("^[A-Z0-9]{12}\\d{2}$")) {
            return false;
        }

        String base = normalizado.substring(0, 12);
        int dv1 = calcularDigitoVerificador(base, PESOS_DV1);
        int dv2 = calcularDigitoVerificador(base + dv1, PESOS_DV2);

        return normalizado.equals(base + dv1 + dv2);
    }

    private int calcularDigitoVerificador(String base, int[] pesos) {
        int soma = 0;
        for (int i = 0; i < base.length(); i++) {
            int valor = base.charAt(i) - '0';
            soma += valor * pesos[i];
        }

        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

}
