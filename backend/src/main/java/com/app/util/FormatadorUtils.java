package com.app.util;

public class FormatadorUtils {

    private FormatadorUtils() {
        throw new UnsupportedOperationException("Classe utilitária");
    }

    /**
     * Remove toda a formatação de um telefone.
     * Ex.: (47) 99999-9999 -> 47999999999
     */
    public static String removerFormatacaoTelefone(String telefone) {
        if (telefone == null || telefone.isBlank()) {
            return null;
        }

        return telefone.replaceAll("\\D", "");
    }

    /**
     * Remove toda a formatação de um CEP.
     * Ex.: 89201-000 -> 89201000
     */
    public static String removerFormatacaoCep(String cep) {
        if (cep == null || cep.isBlank()) {
            return null;
        }

        return cep.replaceAll("\\D", "");
    }

    /**
     * Remove toda a formatação de um CNPJ, preservando letras do novo formato
     * alfanumérico da Receita Federal.
     * Ex.: 12.345.678/0001-90 -> 12345678000190
     * Ex.: 12.ABC.345/01DE-35 -> 12ABC34501DE35
     */
    public static String removerFormatacaoCnpj(String cnpj) {
        if (cnpj == null || cnpj.isBlank()) {
            return null;
        }

        return cnpj.replaceAll("[^A-Za-z0-9]", "").toUpperCase();
    }

}
