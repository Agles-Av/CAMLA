package camila.camla.categorias;
import camila.camla.categorias.Categorias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
