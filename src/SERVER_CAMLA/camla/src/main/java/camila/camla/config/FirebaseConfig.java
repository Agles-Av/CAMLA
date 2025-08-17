package camila.camla.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
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
                log.info("Inicializando Firebase con bucket: {}", storageBucket);

                // Cargar credenciales desde resources
                InputStream serviceAccount = new ClassPathResource(firebaseConfigPath).getInputStream();
                GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(credentials)
                        .setStorageBucket(storageBucket)
                        .build();

                FirebaseApp.initializeApp(options);
                log.info("Firebase inicializado correctamente");

            } else {
                log.info("Firebase ya está inicializado");
            }
        } catch (IOException e) {
            log.error("Error al inicializar Firebase: {}", e.getMessage());
            throw new RuntimeException("Error al inicializar Firebase", e);
        }
    }

}
