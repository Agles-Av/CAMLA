package camila.camla.auth.dto;

import camila.camla.usuarios.Usuarios;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class SignedDto {
    private String token;
    private String tokenType;
    private Usuarios user;

    public SignedDto(String token, String tokenType, Usuarios user) {
        this.token = token;
        this.tokenType = tokenType;
        this.user = user;
    }

    public SignedDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Usuarios getUser() {
        return user;
    }

    public void setUser(Usuarios user) {
        this.user = user;
    }
}
