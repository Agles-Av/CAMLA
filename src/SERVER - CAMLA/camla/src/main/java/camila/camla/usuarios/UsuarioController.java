package camila.camla.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/camla/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping("/")
    public ResponseEntity<?> getAllUsuarios() {
        return usuarioService.findAll();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    // Crear un nuevo usuario
    @PostMapping("/")
    public ResponseEntity<?> createUsuario(@RequestBody Usuarios usuario) throws SQLException {
        return usuarioService.saveUser(usuario);
    }

    // Actualizar un usuario por ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable Long id, @RequestBody Usuarios usuario) throws SQLException {
        return usuarioService.updateUser(id, usuario);
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        return usuarioService.deleteUser(id);
    }
}
