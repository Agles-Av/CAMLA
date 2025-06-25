package camila.camla.categorias;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoriasRepository extends JpaRepository<Categorias, Long> {
    /**
     * Buscar categoría por nombre exacto
     */
    Optional<Categorias> findByNombre(String nombre);

    /**
     * Buscar categoría por nombre ignorando mayúsculas/minúsculas
     */
    Optional<Categorias> findByNombreIgnoreCase(String nombre);

    /**
     * Buscar categorías que contengan el texto en el nombre
     */
    List<Categorias> findByNombreContainingIgnoreCase(String nombre);

    /**
     * Verificar si existe una categoría con ese nombre
     */
    boolean existsByNombre(String nombre);

    /**
     * Verificar si existe una categoría con ese nombre (ignorando mayúsculas)
     */
    boolean existsByNombreIgnoreCase(String nombre);

    /**
     * Obtener todas las categorías ordenadas por nombre
     */
    List<Categorias> findAllByOrderByNombreAsc();

    /**
     * Obtener categorías con sus imágenes relacionadas (EAGER loading)
     */
    @Query("SELECT c FROM Categorias c LEFT JOIN FETCH c.imagenesRelacionadas")
    List<Categorias> findAllWithImagenes();

    /**
     * Obtener una categoría específica con sus imágenes
     */
    @Query("SELECT c FROM Categorias c LEFT JOIN FETCH c.imagenesRelacionadas WHERE c.id = :id")
    Optional<Categorias> findByIdWithImagenes(@Param("id") Long id);

    /**
     * Contar cuántas imágenes tiene cada categoría
     */
    @Query("SELECT c.id, c.nombre, COUNT(i) FROM Categorias c LEFT JOIN c.imagenesRelacionadas i GROUP BY c.id, c.nombre")
    List<Object[]> countImagenesByCategoria();

    /**
     * Obtener categorías que tienen al menos una imagen
     */
    @Query("SELECT DISTINCT c FROM Categorias c WHERE SIZE(c.imagenesRelacionadas) > 0")
    List<Categorias> findCategoriasWithImagenes();

    /**
     * Obtener categorías que NO tienen imágenes
     */
    @Query("SELECT c FROM Categorias c WHERE SIZE(c.imagenesRelacionadas) = 0")
    List<Categorias> findCategoriasWithoutImagenes();

    /**
     * Buscar categorías por nombre que contenga el texto (para búsquedas)
     */
    @Query("SELECT c FROM Categorias c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Categorias> searchByNombre(@Param("searchTerm") String searchTerm);

    /**
     * Obtener las categorías más populares (con más imágenes)
     */
    @Query("SELECT c FROM Categorias c LEFT JOIN c.imagenesRelacionadas i GROUP BY c ORDER BY COUNT(i) DESC")
    List<Categorias> findCategoriasOrderByImagenesCountDesc();

    /**
     * Verificar si una categoría se puede eliminar (no tiene imágenes asociadas)
     */
    @Query("SELECT CASE WHEN COUNT(i) = 0 THEN true ELSE false END FROM Categorias c LEFT JOIN c.imagenesRelacionadas i WHERE c.id = :categoriaId")
    boolean canBeDeleted(@Param("categoriaId") Long categoriaId);
}
