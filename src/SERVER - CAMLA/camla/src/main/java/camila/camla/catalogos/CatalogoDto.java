package camila.camla.catalogos;

import camila.camla.usuarios.Usuarios;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CatalogoDto {
    private Long id;
    private String nombre;
    private String contenidoJson;
    private Boolean status; // True = puplico, False = privado
    private Usuarios usuario;

    public Catalogos toEntity(){
        return new Catalogos(id, nombre, contenidoJson, status, usuario);
    }
}
