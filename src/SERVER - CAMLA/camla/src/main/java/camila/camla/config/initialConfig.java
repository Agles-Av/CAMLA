package camila.camla.config;

import camila.camla.catalogos.CatalogRepository;
import camila.camla.catalogos.Catalogos;
import camila.camla.categorias.Categorias;
import camila.camla.categorias.CategoriasRepository;
import camila.camla.imagenes.Imagenes;
import camila.camla.imagenes.ImagenesRepository;
import camila.camla.imagenes.ImagenesService;
import camila.camla.plantilla.Plantilla;
import camila.camla.plantilla.PlantillaRepository;
import camila.camla.usuarios.UsuarioRepository;
import camila.camla.usuarios.Usuarios;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Configuration
public class initialConfig implements CommandLineRunner {

    private final ImagenesRepository imagenesRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriasRepository categoriasRepository;
    private final PlantillaRepository plantillaRepository;
    private final PasswordEncoder encoder;
    private final CatalogRepository catalogRepository;

    public initialConfig(ImagenesRepository imagenesRepository, UsuarioRepository usuarioRepository, CategoriasRepository categoriasRepository, PlantillaRepository plantillaRepository, PasswordEncoder encoder, CatalogRepository catalogRepository) {
        this.imagenesRepository = imagenesRepository;
        this.usuarioRepository = usuarioRepository;
        this.categoriasRepository = categoriasRepository;
        this.plantillaRepository = plantillaRepository;
        this.encoder = encoder;
        this.catalogRepository = catalogRepository;
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Imagenes getOrSaveImagen(Imagenes imagen) {
        Optional<Imagenes> existingImage = imagenesRepository.findByNombre(imagen.getNombre());
        return existingImage.orElseGet(() -> imagenesRepository.save(imagen));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Usuarios getOrSaveUsuario(Usuarios usuario) {
        Optional<Usuarios> existingUsuario = usuarioRepository.findByEmail(usuario.getEmail());
        return existingUsuario.orElseGet(() -> usuarioRepository.save(usuario));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Categorias getOrSaveCategoria(Categorias categoria) {
        Optional<Categorias> existingCategoria = categoriasRepository.findByNombre(categoria.getNombre());
        return existingCategoria.orElseGet(() -> categoriasRepository.save(categoria));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Plantilla getOrSavePlantilla(Plantilla plantilla) {
        Optional<Plantilla> existingPlantilla = plantillaRepository.findByNombre(plantilla.getNombre());
        return existingPlantilla.orElseGet(() -> plantillaRepository.save(plantilla));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public Catalogos getOrSaveCatalog(Catalogos catalog) {
        Optional<Catalogos> existingCatalog = catalogRepository.findByNombre(catalog.getNombre());
        return existingCatalog.orElseGet(() -> catalogRepository.save(catalog));
    }

    @Override
    public void run(String... args) throws Exception {
        Usuarios user1 = getOrSaveUsuario(new Usuarios("Víctor","20223tn008@utez.edu.mx","Viko", encoder.encode("123456")));
        Usuarios user2 = getOrSaveUsuario(new Usuarios("Valentin","20223tn029@utez.edu.mx","Titian", encoder.encode("123456")));

        Categorias categoria1 = getOrSaveCategoria(new Categorias("Tecnología"));
        Categorias categoria2 = getOrSaveCategoria(new Categorias("Hogar"));
        Categorias categoria3 = getOrSaveCategoria(new Categorias("Salud"));
        Categorias categoria4 = getOrSaveCategoria(new Categorias("Deportes"));
        Categorias categoria5 = getOrSaveCategoria(new Categorias("Moda"));
        Categorias categoria6 = getOrSaveCategoria(new Categorias("Alimentos"));
        Categorias categoria7 = getOrSaveCategoria(new Categorias("Juguetes"));
        Categorias categoria8 = getOrSaveCategoria(new Categorias("Libros"));
        Categorias categoria9 = getOrSaveCategoria(new Categorias("Belleza"));
        Categorias categoria10 = getOrSaveCategoria(new Categorias("Automotriz"));
        Categorias categoria11 = getOrSaveCategoria(new Categorias("Mascotas"));

        Plantilla plantilla1 = getOrSavePlantilla(new Plantilla("Plantilla 1", "{\n" +
                "  \"nombre\": \"Plantilla Catálogo de Precios\",\n" +
                "  \"descripcion\": \"Plantilla moderna para mostrar productos con precio, nombre, descripción y estilo limpio.\",\n" +
                "  \"paginas\": [\n" +
                "    {\n" +
                "      \"fondo\": \"#F5F5F5\",\n" +
                "      \"elementos\": [\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"Nuestros productos destacados\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Montserrat\",\n" +
                "            \"tamano\": 32,\n" +
                "            \"color\": \"#2E2E2E\",\n" +
                "            \"negrita\": true,\n" +
                "            \"alineacion\": \"centro\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 100, \"y\": 40 },\n" +
                "          \"dimension\": { \"ancho\": 500, \"alto\": 60 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"card\",\n" +
                "          \"titulo\": \"Producto 1\",\n" +
                "          \"descripcion\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\",\n" +
                "          \"precio\": \"$199.99\",\n" +
                "          \"imagen\": \"https://tubanco.com/imagenes/producto1.png\",\n" +
                "          \"estilo\": {\n" +
                "            \"colorFondo\": \"#FFFFFF\",\n" +
                "            \"bordeColor\": \"#DDDDDD\",\n" +
                "            \"bordeGrosor\": 2,\n" +
                "            \"bordeRadio\": 12\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 80, \"y\": 130 },\n" +
                "          \"dimension\": { \"ancho\": 250, \"alto\": 350 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"card\",\n" +
                "          \"titulo\": \"Producto 2\",\n" +
                "          \"descripcion\": \"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\n" +
                "          \"precio\": \"$299.00\",\n" +
                "          \"imagen\": \"https://tubanco.com/imagenes/producto2.png\",\n" +
                "          \"estilo\": {\n" +
                "            \"colorFondo\": \"#FFFFFF\",\n" +
                "            \"bordeColor\": \"#DDDDDD\",\n" +
                "            \"bordeGrosor\": 2,\n" +
                "            \"bordeRadio\": 12\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 360, \"y\": 130 },\n" +
                "          \"dimension\": { \"ancho\": 250, \"alto\": 350 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"¡Aprovecha nuestras ofertas por tiempo limitado!\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Montserrat\",\n" +
                "            \"tamano\": 20,\n" +
                "            \"color\": \"#FF5722\",\n" +
                "            \"negrita\": true,\n" +
                "            \"alineacion\": \"centro\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 100, \"y\": 510 },\n" +
                "          \"dimension\": { \"ancho\": 500, \"alto\": 40 }\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}\nDescripción de la plantilla 1"));

        Plantilla plantilla2 = getOrSavePlantilla(new Plantilla("Plantilla 2", "{\n" +
                "  \"nombre\": \"Plantilla Servicios Premium\",\n" +
                "  \"descripcion\": \"Plantilla limpia para destacar servicios con íconos, descripción y precio\",\n" +
                "  \"paginas\": [\n" +
                "    {\n" +
                "      \"fondo\": \"#FFFFFF\",\n" +
                "      \"elementos\": [\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"Nuestros Servicios Más Solicitados\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Poppins\",\n" +
                "            \"tamano\": 28,\n" +
                "            \"color\": \"#212121\",\n" +
                "            \"negrita\": true,\n" +
                "            \"alineacion\": \"centro\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 30 },\n" +
                "          \"dimension\": { \"ancho\": 580, \"alto\": 50 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"servicio\",\n" +
                "          \"nombre\": \"Masaje Relajante\",\n" +
                "          \"descripcion\": \"Sesión de 60 minutos con aceites esenciales y música ambiental.\",\n" +
                "          \"precio\": \"$350\",\n" +
                "          \"icono\": \"https://firebasestorage.googleapis.com/iconos/masaje.png\",\n" +
                "          \"estilo\": {\n" +
                "            \"colorFondo\": \"#F9F9F9\",\n" +
                "            \"bordeColor\": \"#E0E0E0\",\n" +
                "            \"bordeRadio\": 10\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 120 },\n" +
                "          \"dimension\": { \"ancho\": 600, \"alto\": 100 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"servicio\",\n" +
                "          \"nombre\": \"Corte de Cabello + Barba\",\n" +
                "          \"descripcion\": \"Estilizado profesional y perfilado completo.\",\n" +
                "          \"precio\": \"$250\",\n" +
                "          \"icono\": \"https://firebasestorage.googleapis.com/iconos/barberia.png\",\n" +
                "          \"estilo\": {\n" +
                "            \"colorFondo\": \"#F0F0F0\",\n" +
                "            \"bordeColor\": \"#BDBDBD\",\n" +
                "            \"bordeRadio\": 10\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 240 },\n" +
                "          \"dimension\": { \"ancho\": 600, \"alto\": 100 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"servicio\",\n" +
                "          \"nombre\": \"Manicure & Pedicure\",\n" +
                "          \"descripcion\": \"Hidratación profunda, limado, color, masaje y decoración.\",\n" +
                "          \"precio\": \"$300\",\n" +
                "          \"icono\": \"https://firebasestorage.googleapis.com/iconos/manicure.png\",\n" +
                "          \"estilo\": {\n" +
                "            \"colorFondo\": \"#FFF8F8\",\n" +
                "            \"bordeColor\": \"#FFCDD2\",\n" +
                "            \"bordeRadio\": 10\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 360 },\n" +
                "          \"dimension\": { \"ancho\": 600, \"alto\": 100 }\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}\n"));

        Catalogos catalogo1 = getOrSaveCatalog(new Catalogos("Primer Catalogo", "{\n" +
                "  \"nombre\": \"Catálogo de Ejemplo - Spa Relax\",\n" +
                "  \"descripcion\": \"Plantilla predeterminada con servicios y diseño minimalista para centros de spa y estética\",\n" +
                "  \"paginas\": [\n" +
                "    {\n" +
                "      \"fondo\": \"#FAFAFA\",\n" +
                "      \"elementos\": [\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"Spa & Bienestar\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Playfair Display\",\n" +
                "            \"tamano\": 40,\n" +
                "            \"color\": \"#3E3E3E\",\n" +
                "            \"negrita\": true,\n" +
                "            \"alineacion\": \"centro\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 100, \"y\": 40 },\n" +
                "          \"dimension\": { \"ancho\": 500, \"alto\": 60 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"imagen\",\n" +
                "          \"url\": \"https://firebasestorage.googleapis.com/spa-cover.jpg\",\n" +
                "          \"posicion\": { \"x\": 80, \"y\": 120 },\n" +
                "          \"dimension\": { \"ancho\": 540, \"alto\": 300 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"Descubre nuestros servicios de relajación corporal, faciales y masajes.\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Roboto\",\n" +
                "            \"tamano\": 18,\n" +
                "            \"color\": \"#4A4A4A\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 100, \"y\": 440 },\n" +
                "          \"dimension\": { \"ancho\": 500, \"alto\": 50 }\n" +
                "        }\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"fondo\": \"#FFFFFF\",\n" +
                "      \"elementos\": [\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"Servicios Destacados\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Poppins\",\n" +
                "            \"tamano\": 28,\n" +
                "            \"color\": \"#212121\",\n" +
                "            \"negrita\": true\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 30 },\n" +
                "          \"dimension\": { \"ancho\": 580, \"alto\": 50 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"servicio\",\n" +
                "          \"nombre\": \"Masaje Sueco\",\n" +
                "          \"descripcion\": \"Alivia el estrés y mejora la circulación.\",\n" +
                "          \"precio\": \"$399\",\n" +
                "          \"icono\": \"https://firebasestorage.googleapis.com/iconos/masaje.png\",\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 100 },\n" +
                "          \"dimension\": { \"ancho\": 600, \"alto\": 90 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"servicio\",\n" +
                "          \"nombre\": \"Limpieza Facial Profunda\",\n" +
                "          \"descripcion\": \"Tratamiento renovador de piel con productos naturales.\",\n" +
                "          \"precio\": \"$299\",\n" +
                "          \"icono\": \"https://firebasestorage.googleapis.com/iconos/facial.png\",\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 210 },\n" +
                "          \"dimension\": { \"ancho\": 600, \"alto\": 90 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"servicio\",\n" +
                "          \"nombre\": \"Terapia de Aromas\",\n" +
                "          \"descripcion\": \"Sesión de 45 minutos con aceites esenciales.\",\n" +
                "          \"precio\": \"$349\",\n" +
                "          \"icono\": \"https://firebasestorage.googleapis.com/iconos/aromas.png\",\n" +
                "          \"posicion\": { \"x\": 60, \"y\": 320 },\n" +
                "          \"dimension\": { \"ancho\": 600, \"alto\": 90 }\n" +
                "        }\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"fondo\": \"#F7F7F7\",\n" +
                "      \"elementos\": [\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"¡Reserva tu cita hoy!\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Poppins\",\n" +
                "            \"tamano\": 24,\n" +
                "            \"color\": \"#2E7D32\",\n" +
                "            \"negrita\": true,\n" +
                "            \"alineacion\": \"centro\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 100, \"y\": 100 },\n" +
                "          \"dimension\": { \"ancho\": 500, \"alto\": 50 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"texto\",\n" +
                "          \"contenido\": \"Tel: 55 1234 5678  |  Instagram: @spa_relax\",\n" +
                "          \"estilo\": {\n" +
                "            \"fuente\": \"Roboto\",\n" +
                "            \"tamano\": 16,\n" +
                "            \"color\": \"#666666\"\n" +
                "          },\n" +
                "          \"posicion\": { \"x\": 100, \"y\": 180 },\n" +
                "          \"dimension\": { \"ancho\": 500, \"alto\": 30 }\n" +
                "        },\n" +
                "        {\n" +
                "          \"tipo\": \"imagen\",\n" +
                "          \"url\": \"https://firebasestorage.googleapis.com/iconos/redes.png\",\n" +
                "          \"posicion\": { \"x\": 250, \"y\": 240 },\n" +
                "          \"dimension\": { \"ancho\": 200, \"alto\": 80 }\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}\n", false, user1));
    }
}
