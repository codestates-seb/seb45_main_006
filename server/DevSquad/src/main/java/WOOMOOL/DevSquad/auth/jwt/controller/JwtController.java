package WOOMOOL.DevSquad.auth.jwt.controller;

import WOOMOOL.DevSquad.auth.jwt.dto.LogoutDto;
import WOOMOOL.DevSquad.auth.jwt.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class JwtController {

    private final JwtService jwtService;

    public JwtController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/accessToken")
    public ResponseEntity generateNewAccessToken(HttpServletRequest request){

        String newAccessToken = jwtService.generateNewAccessTokenFromRefreshToken(request);
        // 액세스토큰 재발급 후 헤더에 담아서 보내줌
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Authorization","Bearer " + newAccessToken)
                .build();

    }

    @DeleteMapping("/refreshToken")
    public ResponseEntity deleteRefreshToken(@RequestBody LogoutDto logoutDto){

        jwtService.deleteRefreshToken(logoutDto.getEmail());

        return new ResponseEntity(HttpStatus.OK);
    }
}
