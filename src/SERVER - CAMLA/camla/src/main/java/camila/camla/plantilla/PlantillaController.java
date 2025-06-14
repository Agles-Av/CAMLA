package camila.camla.plantilla;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/camla/plantillas")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class PlantillaController {
    private final PlantillaService plantillaService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return plantillaService.getAll();
    }
}
