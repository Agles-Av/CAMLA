package camila.camla.security.token;


import camila.camla.usuarios.UsuarioService;
import camila.camla.usuarios.Usuarios;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService{

    private final UsuarioService usuarioService;

    public UserDetailsServiceImpl(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuarios usuario = usuarioService.findByEmail(email);
        if (usuario != null) {
            return UserDetailsImpl.build(usuario);
        }
        throw new UsernameNotFoundException("Usuario con email " + email + " no encontrado");
    }
}