package camila.camla.imagenes;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
@Service
public class FirebaseStorageService {
    @Value("${firebase.storage.bucket}")
    private String bucketName;

    public String subirImagen(MultipartFile archivo, String nombrePersonalizado) throws IOException {

        try {
            System.out.println(nombrePersonalizado+"\n"+ bucketName);
            // Generar nombre único
            String extension = obtenerExtension(archivo.getOriginalFilename());
            String nombreArchivo = nombrePersonalizado + "_" + UUID.randomUUID().toString() + extension;
            String rutaCompleta = "imagenes/" + nombreArchivo;

            // Obtener cliente de Storage
            Storage storage = StorageClient.getInstance().bucket().getStorage();

            // Crear BlobInfo con metadatos
            BlobId blobId = BlobId.of(bucketName, rutaCompleta);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(archivo.getContentType())
                    .setCacheControl("public, max-age=31536000") // Cache por 1 año
                    .build();

            // Subir archivo
            Blob blob = storage.create(blobInfo, archivo.getBytes());

            // Hacer público el archivo
            blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

            // Generar URL pública
            String urlPublica = String.format("https://storage.googleapis.com/%s/%s",
                    bucketName, blob.getName());

            return urlPublica;

        } catch (Exception e) {
            System.out.println("Error al subir imagen a Firebase Storage: " + e.getMessage());
            throw new IOException("Error al subir imagen a Firebase Storage", e);
        }
    }

    public boolean eliminarImagen(String rutaArchivo) {
        try {
            Storage storage = StorageClient.getInstance().bucket().getStorage();
            BlobId blobId = BlobId.of(bucketName, rutaArchivo);
            boolean eliminado = storage.delete(blobId);

            return eliminado;

        } catch (Exception e) {
            return false;
        }
    }

    public boolean esImagenValida(MultipartFile archivo) {
        if (archivo == null || archivo.isEmpty()) {
            return false;
        }

        String contentType = archivo.getContentType();
        boolean esValida = contentType != null && contentType.startsWith("image/");

        if (!esValida) {
        }

        return esValida;
    }

    private String obtenerExtension(String nombreArchivo) {
        if (nombreArchivo != null && nombreArchivo.contains(".")) {
            return nombreArchivo.substring(nombreArchivo.lastIndexOf("."));
        }
        return "";
    }
}
