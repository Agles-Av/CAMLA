package camila.camla.catalogos;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/camla/catalogos")
@CrossOrigin(origins = {"*"})
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return catalogService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return catalogService.getById(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> getByUsuario(@PathVariable Long usuarioId) {
        return catalogService.getByUsuario(usuarioId);
    }

    @GetMapping("/publicos")
    public ResponseEntity<?> getPublicCatalogs() {
        return catalogService.getPublicCatalogs();
    }

    @PostMapping("/")
    public ResponseEntity<?> newCatalog(@RequestBody CatalogoDto catalog) {
        return catalogService.newCatalog(catalog.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCatalog(@RequestBody CatalogoDto catalog, @PathVariable Long id) {
        return catalogService.updateCatalog(catalog.toEntity());
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable Long id) {
        return catalogService.changeStatus(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCatalog(@PathVariable Long id) {
        return catalogService.deleteCatalog(id);
    }
}