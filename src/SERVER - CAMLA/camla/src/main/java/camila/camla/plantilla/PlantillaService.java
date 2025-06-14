package camila.camla.plantilla;


import camila.camla.config.CustomResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PlantillaService {
    private final PlantillaRepository plantillaRepository;
    private final CustomResponse customResponse;

    public PlantillaService(PlantillaRepository plantillaRepository, CustomResponse customResponse) {
        this.plantillaRepository = plantillaRepository;
        this.customResponse = customResponse;
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll() {
        return customResponse.getJSONResponse(plantillaRepository.findAll());
    }

}
