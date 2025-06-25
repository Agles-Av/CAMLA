package camila.camla.imagenes;
import camila.camla.imagenes.ImagenResponseDTO;
import camila.camla.imagenes.SubirImagenRequestDTO;
import camila.camla.imagenes.ImagenesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/imagenes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ImagenesController {
    private final ImagenesService imagenesService;

    @PostMapping(value = "/subir", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> subirImagen(
            @RequestParam("archivo") MultipartFile archivo,
            @RequestParam("nombre") String nombre,
            @RequestParam("id") Long usuarioId,
            @RequestParam("id") Long categoriaId) {

        try {
            SubirImagenRequestDTO request = new SubirImagenRequestDTO(nombre, usuarioId, categoriaId);
            ImagenResponseDTO response = imagenesService.subirImagen(archivo, request);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Imagen subida exitosamente",
                    "data", response
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al subir la imagen: " + e.getMessage()
            ));
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> obtenerTodasLasImagenes() {
        try {
            List<ImagenResponseDTO> imagenes = imagenesService.obtenerTodasLasImagenes();

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Imágenes obtenidas exitosamente",
                    "data", imagenes,
                    "total", imagenes.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener las imágenes: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerImagenPorId(@PathVariable Long id) {
        return imagenesService.obtenerImagenPorId(id)
                .map(imagen -> ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Imagen encontrada",
                        "data", imagen
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Map<String, Object>> obtenerImagenesPorUsuario(@PathVariable Long usuarioId) {
        try {
            List<ImagenResponseDTO> imagenes = imagenesService.obtenerImagenesPorUsuario(usuarioId);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Imágenes del usuario obtenidas exitosamente",
                    "data", imagenes,
                    "total", imagenes.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener las imágenes del usuario: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<Map<String, Object>> obtenerImagenesPorCategoria(@PathVariable Long categoriaId) {
        try {
            List<ImagenResponseDTO> imagenes = imagenesService.obtenerImagenesPorCategoria(categoriaId);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Imágenes de la categoría obtenidas exitosamente",
                    "data", imagenes,
                    "total", imagenes.size()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al obtener las imágenes de la categoría: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarImagen(@PathVariable Long id) {
        try {
            boolean eliminado = imagenesService.eliminarImagen(id);

            if (eliminado) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Imagen eliminada exitosamente"
                ));
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error al eliminar la imagen: " + e.getMessage()
            ));
        }
    }
}
