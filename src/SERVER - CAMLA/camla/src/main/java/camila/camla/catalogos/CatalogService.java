package camila.camla.catalogos;

import camila.camla.config.CustomResponse;
import camila.camla.plantilla.PlantillaRepository;
import camila.camla.usuarios.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CatalogService {
    private final CatalogRepository catalogRepository;
    private final PlantillaRepository plantillaRepository;
    private final UsuarioRepository usuarioRepository;
    private final CustomResponse customResponse;

    public CatalogService(CatalogRepository catalogRepository, PlantillaRepository plantillaRepository, UsuarioRepository usuarioRepository, CustomResponse customResponse) {
        this.catalogRepository = catalogRepository;
        this.plantillaRepository = plantillaRepository;
        this.usuarioRepository = usuarioRepository;
        this.customResponse = customResponse;
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll(){
        return customResponse.getJSONResponse(catalogRepository.findAll());
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getById(Long id){
        if (!catalogRepository.existsById(id)) {
            return customResponse.getBadRequest("Catalogo no encontrado");
        }
        return customResponse.getJSONResponse(catalogRepository.findById(id));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getByUsuario(Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            return customResponse.getBadRequest("Usuario no encontrado");
        }
        return customResponse.getJSONResponse(catalogRepository.findByUsuario(usuarioRepository.findById(usuarioId).get()));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getPublicCatalogs() {
        return customResponse.getJSONResponse(catalogRepository.findByStatus(true));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> newCatalog(Catalogos catalog) {
        if (catalog.getUsuario() == null || !usuarioRepository.existsById(catalog.getUsuario().getId())) {
            return customResponse.getBadRequest("Usuario no encontrado");
        }
        Catalogos savedCatalog = catalogRepository.save(catalog);
        return customResponse.getJSONResponse(savedCatalog);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> updateCatalog(Catalogos catalog) {
        if (catalog.getUsuario() == null || !usuarioRepository.existsById(catalog.getUsuario().getId())) {
            return customResponse.getBadRequest("Usuario no encontrado");
        }
        Optional<Catalogos> catalogoFound = catalogRepository.findById(catalog.getId());
        if (catalogoFound.isEmpty()) {
            return customResponse.getBadRequest("Catalogo no encontrado");
        }
        Catalogos existingCatalog = catalogoFound.get();
        existingCatalog.setNombre(catalog.getNombre());
        existingCatalog.setStatus(catalog.getStatus());
        existingCatalog.setContenidoJson(catalog.getContenidoJson());
        catalogRepository.save(existingCatalog);

        return customResponse.getJSONResponse(existingCatalog);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeStatus(Long id){
        Optional<Catalogos> catalogoFound = catalogRepository.findById(id);
        if (catalogoFound.isEmpty()) {
            return customResponse.getBadRequest("Catalogo no encontrado");
        }
        Catalogos catalog = catalogoFound.get();
        catalog.setStatus(!catalog.getStatus());
        catalogRepository.save(catalog);
        return customResponse.getJSONResponse(catalog);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> deleteCatalog(Long id) {
        if (!catalogRepository.existsById(id)) {
            return customResponse.getBadRequest("Catalogo no encontrado");
        }
        catalogRepository.deleteById(id);
        return customResponse.getOkResponse("Catalogo eliminado correctamente");
    }
}
