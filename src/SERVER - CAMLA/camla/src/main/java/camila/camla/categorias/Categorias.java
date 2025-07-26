package camila.camla.categorias;

import camila.camla.imagenes.Imagenes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "categorias")
public class Categorias {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false, unique = true)
    private String nombre;

    @JsonIgnoreProperties(value = {"categoria"})
    @OneToMany(mappedBy="categoria", fetch = FetchType.LAZY)
    private List<Imagenes> imagenesRelacionadas;

    public Categorias(Long id, String nombre, List<Imagenes> imagenesRelacionadas) {
        this.id = id;
        this.nombre = nombre;
        this.imagenesRelacionadas = imagenesRelacionadas;
    }

    public Categorias(String nombre) {
        this.nombre = nombre;
    }

    public Categorias(String nombre, List<Imagenes> imagenesRelacionadas) {
        this.nombre = nombre;
        this.imagenesRelacionadas = imagenesRelacionadas;
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

    public List<Imagenes> getImagenesRelacionadas() {
        return imagenesRelacionadas;
    }

    public void setImagenesRelacionadas(List<Imagenes> imagenesRelacionadas) {
        this.imagenesRelacionadas = imagenesRelacionadas;
    }

    public Categorias() {
    }
}
