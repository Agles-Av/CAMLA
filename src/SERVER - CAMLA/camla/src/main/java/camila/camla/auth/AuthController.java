package camila.camla.auth;

import camila.camla.usuarios.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/camla/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto){
        return authService.login(dto);
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable("id") Long id, @RequestBody LoginDto coso){
        return authService.updatePassword(id, coso);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuarios nuevoUsuario) {
        return authService.register(nuevoUsuario);
    }
}

