package camila.camla.imagenes;
import camila.camla.imagenes.ImagenResponseDTO;
import camila.camla.imagenes.SubirImagenRequestDTO;
import camila.camla.categorias.Categorias;
import camila.camla.imagenes.Imagenes;
import camila.camla.usuarios.Usuarios;
import camila.camla.categorias.CategoriasRepository;
import camila.camla.imagenes.ImagenesRepository;
import camila.camla.usuarios.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImagenesService {
    private final ImagenesRepository imagenesRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriasRepository categoriasRepository;
    private final FirebaseStorageService firebaseStorageService;

    @Transactional
    public ImagenResponseDTO subirImagen(MultipartFile archivo, SubirImagenRequestDTO request) throws IOException {
        // Validaciones
        validarArchivo(archivo);
        validarRequest(request);

        // Verificar que no exista una imagen con el mismo nombre
        if (imagenesRepository.findByNombre(request.getNombre()).isPresent()) {
            throw new IllegalArgumentException("Ya existe una imagen con el nombre: " + request.getNombre());
        }

        // Verificar que existan el usuario y la categoría
        Usuarios usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + request.getUsuarioId()));

        Categorias categoria = categoriasRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada con ID: " + request.getCategoriaId()));

        // Subir imagen a Firebase
        String urlPublica = firebaseStorageService.subirImagen(archivo, request.getNombre());

        // Crear y guardar la entidad
        Imagenes imagen = new Imagenes();
        imagen.setNombre(request.getNombre());
        imagen.setUrl(urlPublica);
        imagen.setUsuario(usuario);
        imagen.setCategoria(categoria);

        Imagenes imagenGuardada = imagenesRepository.save(imagen);

        return ImagenResponseDTO.fromEntity(imagenGuardada);
    }

    public List<ImagenResponseDTO> obtenerTodasLasImagenes() {
        return imagenesRepository.findAllWithDetails()
                .stream()
                .map(ImagenResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ImagenResponseDTO> obtenerImagenesPorUsuario(Long usuarioId) {
        return imagenesRepository.findByUsuarioIdWithDetails(usuarioId)
                .stream()
                .map(ImagenResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ImagenResponseDTO> obtenerImagenesPorCategoria(Long categoriaId) {
        return imagenesRepository.findByCategoriaId(categoriaId)
                .stream()
                .map(ImagenResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<ImagenResponseDTO> obtenerImagenPorId(Long id) {
        return imagenesRepository.findById(id)
                .map(ImagenResponseDTO::fromEntity);
    }

    @Transactional
    public boolean eliminarImagen(Long id) {
        Optional<Imagenes> imagenOpt = imagenesRepository.findById(id);
        if (imagenOpt.isPresent()) {
            Imagenes imagen = imagenOpt.get();

            // Extraer nombre del archivo de la URL para eliminarlo de Firebase
            String nombreArchivo = extraerNombreArchivo(imagen.getUrl());
            firebaseStorageService.eliminarImagen(nombreArchivo);

            // Eliminar de la base de datos
            imagenesRepository.delete(imagen);
            return true;
        }
        return false;
    }

    private void validarArchivo(MultipartFile archivo) {
        if (!firebaseStorageService.esImagenValida(archivo)) {
            throw new IllegalArgumentException("El archivo debe ser una imagen válida");
        }

        // Validar tamaño (ejemplo: máximo 5MB)
        if (archivo.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("El archivo no puede ser mayor a 5MB");
        }
    }

    private void validarRequest(SubirImagenRequestDTO request) {
        if (request.getNombre() == null || request.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la imagen es requerido");
        }

        if (request.getUsuarioId() == null) {
            throw new IllegalArgumentException("El ID del usuario es requerido");
        }

        if (request.getCategoriaId() == null) {
            throw new IllegalArgumentException("El ID de la categoría es requerido");
        }
    }

    private String extraerNombreArchivo(String url) {
        // Extraer el nombre del archivo de la URL de Firebase Storage
        String[] partes = url.split("/");
        return partes[partes.length - 1];
    }

}
