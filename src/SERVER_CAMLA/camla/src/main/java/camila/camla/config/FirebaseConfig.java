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
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
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

                InputStream credentialsStream;

                // Verifica si existe la variable de entorno para Railway
                String envJson = System.getenv("GOOGLE_CLOUD_KEY");
                if (envJson != null && !envJson.isEmpty()) {
                    System.out.println("Usando credenciales desde variable de entorno...");
                    credentialsStream = new ByteArrayInputStream(envJson.getBytes(StandardCharsets.UTF_8));
                } else {
                    System.out.println("Usando credenciales desde archivo local...");
                    credentialsStream = new ClassPathResource(firebaseConfigPath).getInputStream();
                }

                GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream)
                        .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

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