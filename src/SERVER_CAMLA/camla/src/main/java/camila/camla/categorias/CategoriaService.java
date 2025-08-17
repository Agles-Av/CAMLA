package camila.camla.categorias;

import camila.camla.categorias.CategoriaRequestDTO;
import camila.camla.categorias.CategoriaResponseDTO;
import camila.camla.categorias.Categorias;
import camila.camla.categorias.CategoriasRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    private final CategoriasRepository categoriasRepository;
    private static final Logger log = LoggerFactory.getLogger(CategoriaService.class);

    public CategoriaService(CategoriasRepository categoriasRepository) {
        this.categoriasRepository = categoriasRepository;
    }

    @Transactional
    public CategoriaResponseDTO crearCategoria(CategoriaRequestDTO request) {
        log.info("Creando nueva categoría: {}", request.getNombre());

        // Verificar que no exista una categoría con el mismo nombre
        if (categoriasRepository.existsByNombreIgnoreCase(request.getNombre())) {
            throw new IllegalArgumentException("Ya existe una categoría con el nombre: " + request.getNombre());
        }

        Categorias categoria = new Categorias();
        categoria.setNombre(request.getNombre().trim());

        Categorias categoriaGuardada = categoriasRepository.save(categoria);
        log.info("Categoría creada exitosamente con ID: {}", categoriaGuardada.getId());

        return CategoriaResponseDTO.fromEntitySimple(categoriaGuardada);
    }

    public List<CategoriaResponseDTO> obtenerTodasLasCategorias() {
        log.info("Obteniendo todas las categorías");
        return categoriasRepository.findAllByOrderByNombreAsc()
                .stream()
                .map(CategoriaResponseDTO::fromEntitySimple)
                .collect(Collectors.toList());
    }

    public List<CategoriaResponseDTO> obtenerCategoriasConConteoImagenes() {
        log.info("Obteniendo categorías con conteo de imágenes");
        return categoriasRepository.findAllWithImagenes()
                .stream()
                .map(CategoriaResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<CategoriaResponseDTO> obtenerCategoriaPorId(Long id) {
        log.info("Obteniendo categoría por ID: {}", id);
        return categoriasRepository.findById(id)
                .map(CategoriaResponseDTO::fromEntitySimple);
    }

    public Optional<CategoriaResponseDTO> obtenerCategoriaPorNombre(String nombre) {
        log.info("Obteniendo categoría por nombre: {}", nombre);
        return categoriasRepository.findByNombreIgnoreCase(nombre)
                .map(CategoriaResponseDTO::fromEntitySimple);
    }

    public List<CategoriaResponseDTO> buscarCategorias(String searchTerm) {
        log.info("Buscando categorías con término: {}", searchTerm);
        return categoriasRepository.searchByNombre(searchTerm)
                .stream()
                .map(CategoriaResponseDTO::fromEntitySimple)
                .collect(Collectors.toList());
    }

    public List<CategoriaResponseDTO> obtenerCategoriasPopulares() {
        log.info("Obteniendo categorías más populares");
        return categoriasRepository.findCategoriasOrderByImagenesCountDesc()
                .stream()
                .map(CategoriaResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<CategoriaResponseDTO> obtenerCategoriasConImagenes() {
        log.info("Obteniendo categorías que tienen imágenes");
        return categoriasRepository.findCategoriasWithImagenes()
                .stream()
                .map(CategoriaResponseDTO::fromEntitySimple)
                .collect(Collectors.toList());
    }

    public List<CategoriaResponseDTO> obtenerCategoriasSinImagenes() {
        log.info("Obteniendo categorías sin imágenes");
        return categoriasRepository.findCategoriasWithoutImagenes()
                .stream()
                .map(CategoriaResponseDTO::fromEntitySimple)
                .collect(Collectors.toList());
    }

    @Transactional
    public CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO request) {
        log.info("Actualizando categoría ID: {} con nombre: {}", id, request.getNombre());

        Categorias categoria = categoriasRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada con ID: " + id));

        // Verificar que no exista otra categoría con el mismo nombre
        Optional<Categorias> categoriaExistente = categoriasRepository.findByNombreIgnoreCase(request.getNombre());
        if (categoriaExistente.isPresent() && !categoriaExistente.get().getId().equals(id)) {
            throw new IllegalArgumentException("Ya existe otra categoría con el nombre: " + request.getNombre());
        }

        categoria.setNombre(request.getNombre().trim());
        Categorias categoriaActualizada = categoriasRepository.save(categoria);

        log.info("Categoría actualizada exitosamente");
        return CategoriaResponseDTO.fromEntitySimple(categoriaActualizada);
    }

    @Transactional
    public boolean eliminarCategoria(Long id) {
        log.info("Intentando eliminar categoría ID: {}", id);

        if (!categoriasRepository.existsById(id)) {
            log.warn("Categoría no encontrada con ID: {}", id);
            return false;
        }

        // Verificar si se puede eliminar (no tiene imágenes asociadas)
        if (!categoriasRepository.canBeDeleted(id)) {
            throw new IllegalArgumentException("No se puede eliminar la categoría porque tiene imágenes asociadas");
        }

        categoriasRepository.deleteById(id);
        log.info("Categoría eliminada exitosamente");
        return true;
    }

    public boolean existeCategoria(Long id) {
        return categoriasRepository.existsById(id);
    }

    public boolean existeCategoriaPorNombre(String nombre) {
        return categoriasRepository.existsByNombreIgnoreCase(nombre);
    }

}
