package WOOMOOL.DevSquad.auth.handler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
// 인증 과정에서 예외 발생 시 실행 될 EntryPoint 메서드
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");

        String exceptionMessage;

        if (exception instanceof ExpiredJwtException) {

            exceptionMessage = "토큰이 만료되었습니다.";

        } else if (exception instanceof SignatureException) {

            exceptionMessage = "유효하지 않은 토큰입니다.";
        } else {

            exceptionMessage = "잘못된 요청입니다";
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(exceptionMessage);

        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Authorization Error: {}", message);

    }
}
