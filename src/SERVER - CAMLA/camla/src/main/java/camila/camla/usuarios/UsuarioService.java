package camila.camla.usuarios;

import camila.camla.config.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CustomResponse customResponse;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(Long id) {
        Optional<Usuarios> user = usuarioRepository.findById(id);
        if (user.isEmpty()) {
            return customResponse.get400Response(404);
        }
        return customResponse.getJSONResponse(user.get());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<Usuarios> users = usuarioRepository.findAll();
        return customResponse.getJSONResponse(users);
    }

    @Transactional(rollbackFor = SQLException.class)
    public ResponseEntity<?> saveUser(Usuarios user) {
        Optional<Usuarios> existing = usuarioRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(user.getEmail()) || u.getUsername().equals(user.getUsername()))
                .findFirst();

        if (existing.isPresent()) {
            return customResponse.getBadRequest("Usuario ya existe con ese email o username");
        }

        Usuarios saved = usuarioRepository.save(user);
        return customResponse.getCreatedResponse("Usuario creado exitosamente");
    }

    @Transactional(rollbackFor = SQLException.class)
    public ResponseEntity<?> updateUser(Long id, Usuarios userDetails) {
        Optional<Usuarios> foundUser = usuarioRepository.findById(id);
        if (foundUser.isEmpty()) {
            return customResponse.get400Response(404);
        }

        Usuarios user = foundUser.get();
        user.setNombre(userDetails.getNombre());
        user.setEmail(userDetails.getEmail());
        user.setUsername(userDetails.getUsername());

        Usuarios updated = usuarioRepository.save(user);
        return customResponse.getJSONResponse(updated);
    }

    public ResponseEntity<?> deleteUser(Long id) {
        Optional<Usuarios> user = usuarioRepository.findById(id);
        if (user.isEmpty()) {
            return customResponse.get400Response(404);
        }

        usuarioRepository.deleteById(id);
        return customResponse.getOkResponse("Usuario eliminado exitosamente");
    }


    public Usuarios findByEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }


}
