package camila.camla.catalogos;

import camila.camla.usuarios.Usuarios;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "catalogos")
@NoArgsConstructor
@Getter
@Setter
public class Catalogos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String contenidoJson;

    @Column(columnDefinition = "BOOL DEFAULT true")
    private Boolean status; // True = puplico, False = privado

    @ManyToOne
    @JoinColumn(name="usuario")
    @JsonIgnoreProperties(value = {"imagenesSubidas", "catalogosSubidos"}, allowSetters = true)
    private Usuarios usuario;

    public Catalogos(String nombre, String contenidoJson, Boolean status, Usuarios usuario) {
        this.nombre = nombre;
        this.contenidoJson = contenidoJson;
        this.status = status;
        this.usuario = usuario;
    }

    public Catalogos(Long id, String nombre, String contenidoJson, Boolean status, Usuarios usuario) {
        this.id = id;
        this.nombre = nombre;
        this.contenidoJson = contenidoJson;
        this.status = status;
        this.usuario = usuario;
    }
}
