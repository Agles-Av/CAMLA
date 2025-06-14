package camila.camla.catalogos;

import camila.camla.usuarios.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogRepository extends JpaRepository<Catalogos, Long> {
    List<Catalogos> findByUsuario(Usuarios usuario);
    List<Catalogos> findByStatus(Boolean status);
}
