package WOOMOOL.DevSquad.auth.handler;

import WOOMOOL.DevSquad.auth.jwt.JwtTokenizer;
import WOOMOOL.DevSquad.auth.refresh.RefreshToken;
import WOOMOOL.DevSquad.auth.refresh.RefreshTokenRepository;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Ref;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
// 인증 과정에서 예외 발생 시 실행 될 EntryPoint 메서드
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public MemberAuthenticationEntryPoint(RefreshTokenRepository refreshTokenRepository, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }


    // JwtVerificationFilter에서 exception 생길 시 commence 메서드 실행
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");

        // 토큰 만료 exception 시 refresh 토큰 검증 후 자동으로 accessToken 발급
        if (exception instanceof ExpiredJwtException) {
            // request Header로 받은 refresh 토큰으로 토큰의 username을 통해 토큰 재발급을 위한 Member 객체 찾기
            String jws = request.getHeader("Refresh");
            RefreshToken refreshToken = refreshTokenRepository.findByJws(jws);
            String username = refreshToken.getUsername();

            Optional<Member> optionalMember = memberRepository.findByEmail(username);
            Member findMember = optionalMember.orElseThrow(() -> new RuntimeException());

            // refresh 토큰이 유효하지 않으면 다시 로그인
            // refresh 토큰이 유효하면 새로운 accessToken 생성 후 반환
            jwtTokenizer.verifySignature(jws, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()));

            String newAccessToken = delegateAccessToken(findMember);
            response.setHeader("Authorization", "Bearer " + newAccessToken);

           // 새로 발급받았을 때 HttpStatus가 뭐가 좋을까..
        } else {

            // 다른 예외면 에러 처리
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            String message = exception != null ? exception.getMessage() : authException.getMessage();
            log.warn("Authorization Error: {}", message);

        }
    }
    private String delegateAccessToken(Member member) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(
                claims,
                subject,
                expiration,
                base64EncodedSecretKey);

        return accessToken;
    }
}
