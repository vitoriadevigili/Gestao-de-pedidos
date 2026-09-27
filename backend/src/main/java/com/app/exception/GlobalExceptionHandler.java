package com.app.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> tratarErroValidacao(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ErrorResponse.CampoInvalido> erros = ex.getBindingResult().getFieldErrors().stream()
                .map(erro -> new ErrorResponse.CampoInvalido(erro.getField(), erro.getDefaultMessage()))
                .toList();

        return construirResposta(HttpStatus.BAD_REQUEST, "Erro de validação", erros, request);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> tratarResponseStatusException(ResponseStatusException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
        return construirResposta(status, ex.getReason(), null, request);
    }

    private ResponseEntity<ErrorResponse> construirResposta(
            HttpStatus status,
            String message,
            List<ErrorResponse.CampoInvalido> erros,
            HttpServletRequest request
    ) {
        ErrorResponse body = new ErrorResponse(
                OffsetDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                erros,
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(body);
    }
}
