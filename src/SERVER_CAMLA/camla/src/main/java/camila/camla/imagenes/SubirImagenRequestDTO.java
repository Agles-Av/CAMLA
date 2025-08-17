package camila.camla.imagenes;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

public class SubirImagenRequestDTO {
    private String nombre;
    private Long usuarioId;
    private Long categoriaId;
    private Boolean status;

    public SubirImagenRequestDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public SubirImagenRequestDTO(String nombre, Long usuarioId, Long categoriaId, Boolean status) {
        this.nombre = nombre;
        this.usuarioId = usuarioId;
        this.categoriaId = categoriaId;
        this.status = status;
    }
}
