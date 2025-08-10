package camila.camla.categorias;
import camila.camla.categorias.CategoriaRequestDTO;
import camila.camla.categorias.CategoriaResponseDTO;
import camila.camla.categorias.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/camla/categorias")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoriasController {
    private final CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> crearCategoria(@Valid @RequestBody CategoriaRequestDTO request) {
        try {
            CategoriaResponseDTO response = categoriaService.crearCategoria(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Categoría creada exitosamente",
                    "data", response
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> obtenerTodasLasCategorias() {
        try {
            List<CategoriaResponseDTO> categorias = categoriaService.obtenerTodasLasCategorias();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Categorías obtenidas exitosamente",
                    "data", categorias,
                    "total", categorias.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener las categorías: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/con-imagenes")
    public ResponseEntity<Map<String, Object>> obtenerCategoriasConConteoImagenes() {
        try {
            List<CategoriaResponseDTO> categorias = categoriaService.obtenerCategoriasConConteoImagenes();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Categorías con conteo obtenidas exitosamente",
                    "data", categorias,
                    "total", categorias.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener las categorías: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerCategoriaPorId(@PathVariable Long id) {
        return categoriaService.obtenerCategoriaPorId(id)
                .map(categoria -> ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Categoría encontrada",
                        "data", categoria
                )))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "success", false,
                        "message", "Categoría no encontrada"
                )));
    }

    @GetMapping("/buscar")
    public ResponseEntity<Map<String, Object>> buscarCategorias(@RequestParam String q) {
        try {
            List<CategoriaResponseDTO> categorias = categoriaService.buscarCategorias(q);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Búsqueda completada",
                    "data", categorias,
                    "total", categorias.size(),
                    "searchTerm", q
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error en la búsqueda: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/populares")
    public ResponseEntity<Map<String, Object>> obtenerCategoriasPopulares() {
        try {
            List<CategoriaResponseDTO> categorias = categoriaService.obtenerCategoriasPopulares();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Categorías populares obtenidas exitosamente",
                    "data", categorias,
                    "total", categorias.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener categorías populares: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/con-imagenes-solo")
    public ResponseEntity<Map<String, Object>> obtenerCategoriasConImagenes() {
        try {
            List<CategoriaResponseDTO> categorias = categoriaService.obtenerCategoriasConImagenes();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Categorías con imágenes obtenidas exitosamente",
                    "data", categorias,
                    "total", categorias.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener categorías: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/sin-imagenes")
    public ResponseEntity<Map<String, Object>> obtenerCategoriasSinImagenes() {
        try {
            List<CategoriaResponseDTO> categorias = categoriaService.obtenerCategoriasSinImagenes();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Categorías sin imágenes obtenidas exitosamente",
                    "data", categorias,
                    "total", categorias.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener categorías: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarCategoria(
            @PathVariable Long id,
            @Valid @RequestBody CategoriaRequestDTO request) {
        try {
            CategoriaResponseDTO response = categoriaService.actualizarCategoria(id, request);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Categoría actualizada exitosamente",
                    "data", response
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarCategoria(@PathVariable Long id) {
        try {
            boolean eliminado = categoriaService.eliminarCategoria(id);

            if (eliminado) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Categoría eliminada exitosamente"
                ));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "success", false,
                        "message", "Categoría no encontrada"
                ));
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}/existe")
    public ResponseEntity<Map<String, Object>> verificarExistencia(@PathVariable Long id) {
        boolean existe = categoriaService.existeCategoria(id);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "existe", existe,
                "message", existe ? "La categoría existe" : "La categoría no existe"
        ));
    }
}
