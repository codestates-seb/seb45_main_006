package WOOMOOL.DevSquad.auth.jwt.service;


import WOOMOOL.DevSquad.auth.jwt.JwtTokenizer;
import WOOMOOL.DevSquad.auth.refresh.RefreshToken;
import WOOMOOL.DevSquad.auth.refresh.RefreshTokenRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static WOOMOOL.DevSquad.exception.ExceptionCode.*;


@Service
@RequiredArgsConstructor
public class JwtService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public String generateNewAccessTokenFromRefreshToken(HttpServletRequest request) {

        // 요청에서 refreshToken 받아오기
        String refreshToken = request.getHeader("Refresh");

        //  refreshToken 검증
        try {
            jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()));

        } catch (ExpiredJwtException e) {
            throw new BusinessLogicException(TOKEN_EXPIRED);
        } catch (SignatureException e) {
            throw new BusinessLogicException(INVALID_TOKEN);
        } catch (Exception e) {
            throw new BusinessLogicException(BAD_REQUEST);
        }

        RefreshToken findRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken);
        String username = findRefreshToken.getUsername();

        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow();

        // 엑세스토큰 재발급
        return generateNewAccessToken(findMember);

    }

    // 로그아웃할 시DB 에서 refresh Token 삭제
    public void deleteRefreshToken(String username) {

        RefreshToken refreshToken = refreshTokenRepository.findByUsername(username);
        refreshTokenRepository.delete(refreshToken);
    }

    private String generateNewAccessToken(Member member) {

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
