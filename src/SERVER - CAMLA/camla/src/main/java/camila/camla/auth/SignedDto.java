package camila.camla.auth.dto;

import camila.camla.usuarios.Usuarios;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignedDto {
    private String token;
    private String tokenType;
    private Usuarios user;

    public SignedDto(String token, String tokenType, Usuarios user) {
        this.token = token;
        this.tokenType = tokenType;
        this.user = user;
    }
}
