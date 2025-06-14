package camila.camla.usuarios;

import camila.camla.catalogos.Catalogos;
import camila.camla.imagenes.Imagenes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name ="usuarios")
@NoArgsConstructor
@Getter
@Setter
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String nombre;

    @Column(length = 45, nullable = false, unique = true)
    private String email;

    @Column(length = 45, nullable = false, unique = true)
    private String username;

    @Column(length = 150, nullable = false)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy="usuario", fetch = FetchType.LAZY)
    private List<Imagenes> imagenesSubidas;

    @JsonIgnore
    @OneToMany(mappedBy="usuario", fetch = FetchType.LAZY)
    private List<Catalogos> catalogosSubidos;

    public Usuarios(Long id, String nombre, String email, String username, String password) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    public Usuarios(String nombre, String email, String username, String password) {
        this.nombre = nombre;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    public Usuarios(String nombre, String email, String username) {
        this.nombre = nombre;
        this.email = email;
        this.username = username;
    }

    public Usuarios(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Usuarios(String nombre, String email, String username, List<Imagenes> imagenesSubidas, List<Catalogos> catalogosSubidos) {
        this.nombre = nombre;
        this.email = email;
        this.username = username;
        this.imagenesSubidas = imagenesSubidas;
        this.catalogosSubidos = catalogosSubidos;
    }
}
