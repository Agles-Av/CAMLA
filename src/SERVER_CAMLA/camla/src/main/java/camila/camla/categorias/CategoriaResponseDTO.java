package camila.camla.categorias;
import camila.camla.categorias.Categorias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class CategoriaResponseDTO {
    private Long id;
    private String nombre;
    private Long totalImagenes;

    public static CategoriaResponseDTO fromEntity(Categorias categoria) {
        return new CategoriaResponseDTO(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getImagenesRelacionadas() != null ?
                        (long) categoria.getImagenesRelacionadas().size() : 0L
        );
    }

    public static CategoriaResponseDTO fromEntitySimple(Categorias categoria) {
        return new CategoriaResponseDTO(
                categoria.getId(),
                categoria.getNombre(),
                null // No cargar el conteo para consultas simples
        );
    }

    public CategoriaResponseDTO(Long id, String nombre, Long totalImagenes) {
        this.id = id;
        this.nombre = nombre;
        this.totalImagenes = totalImagenes;
    }

    public CategoriaResponseDTO() {
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

    public Long getTotalImagenes() {
        return totalImagenes;
    }

    public void setTotalImagenes(Long totalImagenes) {
        this.totalImagenes = totalImagenes;
    }
}
