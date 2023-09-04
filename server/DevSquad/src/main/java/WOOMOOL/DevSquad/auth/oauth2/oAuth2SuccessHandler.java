package WOOMOOL.DevSquad.auth.oauth2;

import WOOMOOL.DevSquad.auth.jwt.JwtTokenizer;
import WOOMOOL.DevSquad.auth.userdetails.MemberAuthority;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

public class oAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthority memberAuthority;
    private final MemberRepository memberRepository;

    public oAuth2SuccessHandler(JwtTokenizer jwtTokenizer, MemberAuthority memberAuthority,MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberAuthority = memberAuthority;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> roles = memberAuthority.createRoles(email);

        saveMember(email);
        redirect(request,response,email,roles);

    }
    // oauth2로 로그인 시 회원 정보 생성
    private void saveMember(String email){

        // 이미 회원 정보가 있으면 생성 X
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) return;

        Member member = new Member(email);
        MemberProfile memberProfile = new MemberProfile(email);
        member.setMemberProfile(memberProfile);

        memberRepository.save(member);
    }
    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> roles) throws IOException {
        String accessToken  = delegateAccessToken(username,roles);
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken,refreshToken).toString();
        getRedirectStrategy().sendRedirect(request,response,uri);

    }
    private URI createURI(String accessToken, String refreshToken){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
    // 엑세스 토큰 생성
    private String delegateAccessToken(String username, List<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", roles);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(
                claims,
                subject,
                expiration,
                base64EncodedSecretKey);

        return accessToken;

    }

    // 리프레시 토큰 생성
    private String delegateRefreshToken(String username) {

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(
                subject,
                expiration,
                base64EncodedSecretKey);

        return refreshToken;
    }
}
