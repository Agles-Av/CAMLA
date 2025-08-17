package camila.camla.imagenes;
import camila.camla.imagenes.Imagenes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ImagenResponseDTO {
    private Long id;
    private String nombre;
    private String url;
    private String usuario;
    private String categoria;
    private Boolean status;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public ImagenResponseDTO() {
    }

    public ImagenResponseDTO(Long id, String nombre, String url, String usuario, String categoria, Boolean status) {
        this.id = id;
        this.nombre = nombre;
        this.url = url;
        this.usuario = usuario;
        this.categoria = categoria;
        this.status = status;
    }

    public static ImagenResponseDTO fromEntity(Imagenes imagen) {
        return new ImagenResponseDTO(
                imagen.getId(),
                imagen.getNombre(),
                imagen.getUrl(),
                imagen.getUsuario().getNombre(), // Asumiendo que Usuarios tiene campo nombre
                imagen.getCategoria().getNombre(),
                imagen.getStatus()
        );
    }
}
