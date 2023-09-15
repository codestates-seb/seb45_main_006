package WOOMOOL.DevSquad.auth.userdetails;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MemberAuthority {
    private final List<String> USER_ROLES = List.of("USER");
    private final List<String> ADMIN_ROLES = List.of("USER", "ADMIN");

    @Value("admin.mail")
    private String admin;


    // admin 계정 정보는 환경 변수로 빼기
    public List<GrantedAuthority> createAuthority(List<String> roles) {

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(String username) {
        if (username.equals(admin)) {
            return ADMIN_ROLES;
        } else return USER_ROLES;
    }
}
