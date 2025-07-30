package camila.camla.plantilla;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "plantilla")
public class Plantilla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = true, unique = true)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String contenidoJson;

    public Plantilla(Long id, String nombre, String contenidoJson) {
        this.id = id;
        this.nombre = nombre;
        this.contenidoJson = contenidoJson;
    }

    public Plantilla(String nombre, String contenidoJson) {
        this.nombre = nombre;
        this.contenidoJson = contenidoJson;
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

    public Plantilla() {
    }
}
