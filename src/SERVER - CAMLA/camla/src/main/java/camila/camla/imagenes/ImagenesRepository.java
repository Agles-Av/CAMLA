package camila.camla.imagenes;

import camila.camla.imagenes.Imagenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ImagenesRepository  extends JpaRepository<Imagenes, Long> {
    Optional<Imagenes> findByNombre(String nombre);

    List<Imagenes> findByUsuarioId(Long usuarioId);

    List<Imagenes> findByCategoriaId(Long categoriaId);

    @Query("SELECT i FROM Imagenes i JOIN FETCH i.usuario JOIN FETCH i.categoria")
    List<Imagenes> findAllWithDetails();

    @Query("SELECT i FROM Imagenes i JOIN FETCH i.usuario JOIN FETCH i.categoria WHERE i.usuario.id = :usuarioId")
    List<Imagenes> findByUsuarioIdWithDetails(@Param("usuarioId") Long usuarioId);
}
