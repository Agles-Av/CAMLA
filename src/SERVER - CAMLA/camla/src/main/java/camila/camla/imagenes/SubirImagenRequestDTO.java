package camila.camla.imagenes;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubirImagenRequestDTO {
    private String nombre;
    private Long usuarioId;
    private Long categoriaId;
}
