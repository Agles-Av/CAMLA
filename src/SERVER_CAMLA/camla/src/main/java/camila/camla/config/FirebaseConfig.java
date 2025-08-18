package camila.camla.config;

import camila.camla.categorias.CategoriaService;
import camila.camla.imagenes.FirebaseStorageService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration

public class FirebaseConfig {

    @Value("${firebase.config.path}")
    private String firebaseConfigPath;

    @Value("${firebase.storage.bucket}")
    private String storageBucket;

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                GoogleCredentials credentials = GoogleCredentials
                        .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                        .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform")); // <-- IMPORTANTE

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(credentials)
                        .setStorageBucket(storageBucket)
                        .build();

                FirebaseApp.initializeApp(options);
                System.out.println("Firebase inicializado con bucket: " + storageBucket);
            }
        } catch (IOException e) {
            System.out.println("Error al inicializar Firebase: " + e.getMessage());
            throw new RuntimeException("Error al inicializar Firebase", e);
        }
    }


}
