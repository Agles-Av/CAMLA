package camila.camla.imagenes;

import camila.camla.categorias.Categorias;
import camila.camla.usuarios.Usuarios;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="imagenes")
@NoArgsConstructor
@Getter
@Setter
public class Imagenes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false, unique = true)
    private String nombre;

    @Column(length = 255, nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name="usuario")
    @JsonIgnoreProperties(value = {"imagenesSubidas", "catalogos"}, allowSetters = true)
    private Usuarios usuario;

    @ManyToOne
    @JoinColumn(name="categoria")
    @JsonIgnoreProperties(value = {"imagenesRelacionadas"}, allowSetters = true)
    private Categorias categoria;

    @Column(columnDefinition = "BOOL DEFAULT true")
    private Boolean status; // True = puplico, False = privado

    public Imagenes(String nombre, String url, Usuarios usuario, Categorias categoria, Boolean status) {
        this.nombre = nombre;
        this.url = url;
        this.usuario = usuario;
        this.categoria = categoria;
        this.status = status;
    }

    public Imagenes(Long id, String nombre, String url, Usuarios usuario, Categorias categoria, Boolean status) {
        this.id = id;
        this.nombre = nombre;
        this.url = url;
        this.usuario = usuario;
        this.categoria = categoria;
        this.status = status;
    }

    public Imagenes(Long id, String nombre, String url, Usuarios usuario, Categorias categoria) {
        this.id = id;
        this.nombre = nombre;
        this.url = url;
        this.usuario = usuario;
        this.categoria = categoria;
    }

    public Imagenes(String nombre, String url, Usuarios usuario, Categorias categoria) {
        this.nombre = nombre;
        this.url = url;
        this.usuario = usuario;
        this.categoria = categoria;
    }
}
