package camila.camla.plantilla;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "plantilla")
@NoArgsConstructor
@Getter
@Setter
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
}
