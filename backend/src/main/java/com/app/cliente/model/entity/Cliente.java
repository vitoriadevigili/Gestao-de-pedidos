package com.app.cliente.model.entity;

import com.app.usuario.model.entity.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 14)
    private String cnpj;

    @Column(length = 11)
    private String telefone;

    @Column(length = 150)
    private String email;

    @Column(name = "exige_nota_fiscal")
    private Boolean exigeNotaFiscal = false;

    @Column
    private Boolean ativo = true;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public boolean estaInativo(){
        return !this.ativo;
    }

}
