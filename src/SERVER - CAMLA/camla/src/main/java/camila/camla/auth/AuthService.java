package camila.camla.auth;

import camila.camla.usuarios.UsuarioRepository;
import camila.camla.usuarios.Usuarios;
import camila.camla.security.token.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<?> login(LoginDto dto) {
        try {
            Optional<Usuarios> userOpt = usuarioRepository.findByEmail(dto.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = jwtProvider.generateToken(auth);

            camila.camla.auth.dto.SignedDto response = new camila.camla.auth.dto.SignedDto(token, "Bearer", userOpt.get());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Credenciales inválidas");
        }
    }

    @Transactional
    public ResponseEntity<?> resetPassword(Long id) {
        Optional<Usuarios> userOpt = usuarioRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Usuarios usuario = userOpt.get();
        usuario.setPassword(passwordEncoder.encode(usuario.getUsername()));
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Contraseña restablecida al nombre de usuario");
    }

    @Transactional
    public ResponseEntity<?> updatePassword(Long id, LoginDto dto) {
        Optional<Usuarios> userOpt = usuarioRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Usuarios usuario = userOpt.get();
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

    @Transactional
    public ResponseEntity<?> register(Usuarios nuevoUsuario) {
        if (usuarioRepository.existsByEmail(nuevoUsuario.getEmail())) {
            return ResponseEntity.badRequest().body("Correo ya registrado");
        }

        if (usuarioRepository.existsByUsername(nuevoUsuario.getUsername())) {
            return ResponseEntity.badRequest().body("Username ya registrado");
        }

        nuevoUsuario.setPassword(passwordEncoder.encode(nuevoUsuario.getPassword()));
        return ResponseEntity.ok(usuarioRepository.save(nuevoUsuario));
    }
}
