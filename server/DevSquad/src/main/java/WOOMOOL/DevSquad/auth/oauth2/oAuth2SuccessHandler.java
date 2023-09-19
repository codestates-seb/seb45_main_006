package WOOMOOL.DevSquad.auth.oauth2;
import WOOMOOL.DevSquad.auth.jwt.service.JwtService;
import WOOMOOL.DevSquad.auth.refresh.RefreshToken;
import WOOMOOL.DevSquad.auth.refresh.RefreshTokenRepository;
import WOOMOOL.DevSquad.auth.userdetails.MemberAuthority;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

import static WOOMOOL.DevSquad.member.entity.Member.MemberType.OAUTH2;

@Transactional
@RequiredArgsConstructor
@Slf4j
public class oAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthority memberAuthority;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> roles = memberAuthority.createRoles(email);

        saveMember(email);
        redirect(request, response, email,roles);
    }

    // oauth2로 로그인 시 회원 정보 생성
    private void saveMember(String email) {

        // 이미 가입한 유저면 객체 반환
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) return;

        // 멤버프로필 정보 생성해서 넣어주기
        // 닉네임 공백은 처음 회원 가입 하는 사람
        Member member = new Member(email);
        MemberProfile memberProfile = new MemberProfile("");
        member.addProfile(memberProfile);

        Level level = new Level();
        memberProfile.addLevel(level);

        memberRepository.save(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String email, List<String> roles) throws IOException {

        String accessToken = "Bearer " + delegateAccessToken(email, roles);
        String refreshToken = delegateRefreshToken(email);

//        log.info(accessToken);

        String uri = createURI(accessToken, refreshToken, email).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
        // 리다이렉트 후 refreshToken 값은 재발급 로직을 위해 DB에 저장
        // 이미 있으면 삭제하고 다시 저장
        RefreshToken findRefreshToken = refreshTokenRepository.findByUsername(email);

        if (findRefreshToken != null) {

            refreshTokenRepository.delete(findRefreshToken);
        }

        RefreshToken saveRefreshToken = RefreshToken.builder()
                .refreshToken(refreshToken)
                .username(email)
                .build();

        refreshTokenRepository.save(saveRefreshToken);

    }

    // 받은 email 과 oAuth2 타입인 회원 정보를 찾아서 uri 생성

    private URI createURI(String accessToken, String refreshToken, String email) {
        Optional<Member> optionalMember = memberRepository.findOAuth2UserByEmail(email);
        MemberProfile findMemberProfile = optionalMember.get().getMemberProfile();

        String nickname = findMemberProfile.getNickname();
        String memberId = String.valueOf(findMemberProfile.getMemberProfileId());

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("nickname", nickname);
        queryParams.add("memberId", memberId);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("dev-squad.s3-website.ap-northeast-2.amazonaws.com")
                .path("/signup/oauth-user")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    // 엑세스 토큰 생성
    private String delegateAccessToken(String email, List<String> roles) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", email);
        claims.put("roles", roles);

        String subject = email;
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
    private String delegateRefreshToken(String email) {

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(
                subject,
                expiration,
                base64EncodedSecretKey);

        return refreshToken;
    }
}
