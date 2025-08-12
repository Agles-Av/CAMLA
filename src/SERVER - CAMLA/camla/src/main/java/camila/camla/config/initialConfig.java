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

        // 🎨 Plantilla 1 - Barra azul con texto
        String plantilla1 = "{\n" +
                "  \"pages\": [\n" +
                "    {\n" +
                "      \"id\": 1,\n" +
                "      \"elements\": [\n" +
                "        {\n" +
                "          \"id\": 101,\n" +
                "          \"type\": \"shape\",\n" +
                "          \"data\": {\"shapeType\": \"rectangle\", \"fillColor\": \"#3B82F6\", \"borderColor\": \"#1E40AF\", \"borderWidth\": 2, \"borderRadius\": 8},\n" +
                "          \"position\": {\"x\": 0, \"y\": 0},\n" +
                "          \"size\": {\"width\": \"1100px\", \"height\": \"80px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        },\n" +
                "        {\n" +
                "          \"id\": 102,\n" +
                "          \"type\": \"text\",\n" +
                "          \"data\": {\"text\": \"Encabezado Azul\", \"fontSize\": 30, \"fontFamily\": \"Arial\", \"color\": \"#FFFFFF\"},\n" +
                "          \"position\": {\"x\": 20, \"y\": 20},\n" +
                "          \"size\": {\"width\": \"500px\", \"height\": \"40px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        }\n" +
                "      ],\n" +
                "      \"background\": {\"type\": \"color\", \"value\": \"#E5E7EB\"}\n" +
                "    }\n" +
                "  ]\n" +
                "}";

// 🌿 Plantilla 2 - Fondo verde con texto centrado
        String plantilla2 = "{\n" +
                "  \"pages\": [\n" +
                "    {\n" +
                "      \"id\": 2,\n" +
                "      \"elements\": [\n" +
                "        {\n" +
                "          \"id\": 201,\n" +
                "          \"type\": \"text\",\n" +
                "          \"data\": {\"text\": \"Bienvenido\", \"fontSize\": 50, \"fontFamily\": \"Verdana\", \"color\": \"#FFFFFF\", \"textAlign\": \"center\"},\n" +
                "          \"position\": {\"x\": 400, \"y\": 200},\n" +
                "          \"size\": {\"width\": \"400px\", \"height\": \"60px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        }\n" +
                "      ],\n" +
                "      \"background\": {\"type\": \"color\", \"value\": \"#10B981\"}\n" +
                "    }\n" +
                "  ]\n" +
                "}";

// ❤️ Plantilla 3 - Rectángulo rojo y texto blanco
        String plantilla3 = "{\n" +
                "  \"pages\": [\n" +
                "    {\n" +
                "      \"id\": 3,\n" +
                "      \"elements\": [\n" +
                "        {\n" +
                "          \"id\": 301,\n" +
                "          \"type\": \"shape\",\n" +
                "          \"data\": {\"shapeType\": \"rectangle\", \"fillColor\": \"#EF4444\", \"borderColor\": \"#B91C1C\", \"borderWidth\": 3, \"borderRadius\": 0},\n" +
                "          \"position\": {\"x\": 100, \"y\": 100},\n" +
                "          \"size\": {\"width\": \"900px\", \"height\": \"300px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        },\n" +
                "        {\n" +
                "          \"id\": 302,\n" +
                "          \"type\": \"text\",\n" +
                "          \"data\": {\"text\": \"Oferta Especial\", \"fontSize\": 40, \"fontFamily\": \"Tahoma\", \"color\": \"#FFFFFF\"},\n" +
                "          \"position\": {\"x\": 130, \"y\": 220},\n" +
                "          \"size\": {\"width\": \"500px\", \"height\": \"50px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        }\n" +
                "      ],\n" +
                "      \"background\": {\"type\": \"color\", \"value\": \"#F3F4F6\"}\n" +
                "    }\n" +
                "  ]\n" +
                "}";

// 🖤 Plantilla 4 - Texto grande sobre fondo negro
        String plantilla4 = "{\n" +
                "  \"pages\": [\n" +
                "    {\n" +
                "      \"id\": 4,\n" +
                "      \"elements\": [\n" +
                "        {\n" +
                "          \"id\": 401,\n" +
                "          \"type\": \"text\",\n" +
                "          \"data\": {\"text\": \"Promoción Limitada\", \"fontSize\": 60, \"fontFamily\": \"Impact\", \"color\": \"#FFD700\"},\n" +
                "          \"position\": {\"x\": 200, \"y\": 250},\n" +
                "          \"size\": {\"width\": \"800px\", \"height\": \"70px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        }\n" +
                "      ],\n" +
                "      \"background\": {\"type\": \"color\", \"value\": \"#000000\"}\n" +
                "    }\n" +
                "  ]\n" +
                "}";

// 🟡 Plantilla 5 - Rectángulo amarillo con texto negro
        String plantilla5 = "{\n" +
                "  \"pages\": [\n" +
                "    {\n" +
                "      \"id\": 5,\n" +
                "      \"elements\": [\n" +
                "        {\n" +
                "          \"id\": 501,\n" +
                "          \"type\": \"shape\",\n" +
                "          \"data\": {\"shapeType\": \"rectangle\", \"fillColor\": \"#FACC15\", \"borderColor\": \"#CA8A04\", \"borderWidth\": 2, \"borderRadius\": 10},\n" +
                "          \"position\": {\"x\": 50, \"y\": 50},\n" +
                "          \"size\": {\"width\": \"1000px\", \"height\": \"400px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        },\n" +
                "        {\n" +
                "          \"id\": 502,\n" +
                "          \"type\": \"text\",\n" +
                "          \"data\": {\"text\": \"Nuevo Producto\", \"fontSize\": 35, \"fontFamily\": \"Georgia\", \"color\": \"#000000\"},\n" +
                "          \"position\": {\"x\": 80, \"y\": 200},\n" +
                "          \"size\": {\"width\": \"500px\", \"height\": \"50px\"},\n" +
                "          \"rotation\": 0, \"opacity\": 1\n" +
                "        }\n" +
                "      ],\n" +
                "      \"background\": {\"type\": \"color\", \"value\": \"#FFFFFF\"}\n" +
                "    }\n" +
                "  ]\n" +
                "}";


        getOrSavePlantilla(new Plantilla("Plantilla 1", plantilla1));
        getOrSavePlantilla(new Plantilla("Plantilla 2", plantilla2));
        getOrSavePlantilla(new Plantilla("Plantilla 3", plantilla3));
        getOrSavePlantilla(new Plantilla("Plantilla 4", plantilla4));
        getOrSavePlantilla(new Plantilla("Plantilla 5", plantilla5));

    }
}
