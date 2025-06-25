package camila.camla.imagenes;
import camila.camla.imagenes.Imagenes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImagenResponseDTO {
    private Long id;
    private String nombre;
    private String url;
    private String usuario;
    private String categoria;

    public static ImagenResponseDTO fromEntity(Imagenes imagen) {
        return new ImagenResponseDTO(
                imagen.getId(),
                imagen.getNombre(),
                imagen.getUrl(),
                imagen.getUsuario().getNombre(), // Asumiendo que Usuarios tiene campo nombre
                imagen.getCategoria().getNombre()
        );
    }
}
