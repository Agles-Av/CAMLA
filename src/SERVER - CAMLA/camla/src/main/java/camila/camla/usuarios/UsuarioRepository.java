package camila.camla.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuarios, Long> {

    Optional<Usuarios> findByEmail(String email);
    Optional<Usuarios> findByUsername(String username);  // ← este lo usas en login
    boolean existsByEmail(String email);                 // ← lo usas en register
    boolean existsByUsername(String username);

}
