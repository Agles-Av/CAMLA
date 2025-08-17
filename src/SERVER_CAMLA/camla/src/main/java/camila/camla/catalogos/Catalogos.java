package camila.camla.catalogos;

import camila.camla.usuarios.Usuarios;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "catalogos")
public class Catalogos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false, unique = true)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String contenidoJson;

    @Column(columnDefinition = "BOOL DEFAULT true")
    private Boolean status; // True = puplico, False = privado

    @ManyToOne
    @JoinColumn(name="usuario")
    @JsonIgnoreProperties(value = {"imagenesSubidas", "catalogosSubidos", "password"}, allowSetters = true)
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContenidoJson() {
        return contenidoJson;
    }

    public void setContenidoJson(String contenidoJson) {
        this.contenidoJson = contenidoJson;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Catalogos() {
    }
}
