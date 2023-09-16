package WOOMOOL.DevSquad.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.beans.Encoder;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import static java.util.Calendar.MINUTE;

@Component
public class JwtTokenizer {

    @Getter
    @Value("${jwt.secretKey}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodedBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String encodedBase64SecretKey) {

        Key key = getKeyFromBase64SecretKey(encodedBase64SecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String encodedBase64SecretKey) {

        Key key = getKeyFromBase64SecretKey(encodedBase64SecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(MINUTE, expirationMinutes);

        Date expiration = calendar.getTime();

        return expiration;

    }

    public Jws<Claims> getClaims(String jws, String encodedBase64SecretKey) {
        Key key = getKeyFromBase64SecretKey(encodedBase64SecretKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public void verifySignature(String jws, String encodedBase64SecretKey) {
        Key key = getKeyFromBase64SecretKey(encodedBase64SecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    private Key getKeyFromBase64SecretKey(String base64EncodedSecretKey) {
        byte[] bytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(bytes);

        return key;

    }
}
