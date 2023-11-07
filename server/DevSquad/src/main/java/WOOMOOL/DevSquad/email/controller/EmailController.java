package WOOMOOL.DevSquad.email.controller;

import WOOMOOL.DevSquad.email.dto.EmailDto;
import WOOMOOL.DevSquad.email.entity.Email;
import WOOMOOL.DevSquad.email.mapper.EmailMapper;
import WOOMOOL.DevSquad.email.service.EmailService;
import WOOMOOL.DevSquad.member.dto.PasswordDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@Api(tags = {"이메일 인증에 대한 API"})
@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final EmailMapper emailMapper;

    // 메일 보내기
    @ApiOperation(value = "회원가입 인증 메일 발송", notes = "회원가입 인증 메일 발송 API, email 필드만 입력해주세요")
    @PostMapping("/authEmail")
    public ResponseEntity sendAuthEmail(@RequestBody @Valid EmailDto emailDto) throws MessagingException, UnsupportedEncodingException {

        Email email = emailMapper.postDtoToEntity(emailDto);
        emailService.createAuthMail(email);

        return new ResponseEntity(HttpStatus.OK);

    }
    @ApiOperation(value = "비밀번호 찾기 메일 발송", notes = "비밀번호 찾기 메일 발송 API, email 필드만 입력해주세요")
    @PostMapping("/findPassword")

    public ResponseEntity sendFindPasswordEmail(@RequestBody @Valid EmailDto emailDto) throws  MessagingException {

        Email email = emailMapper.postDtoToEntity(emailDto);
        emailService.createFindPasswordEmail(email);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 인증 확인
    @ApiOperation(value = "인증 확인", notes = "인증 확인 API, authCode만 입력해주세요")
    @PostMapping("/auth")
    public ResponseEntity verifyAuthCode(@RequestBody @Valid EmailDto emailDto){

        Email email = emailMapper.postDtoToEntity(emailDto);
        emailService.verifyAuthCode(email);

        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value = "비밀번호 찾기", notes = "인증 코드와 바꿀 비밀번호 입력, authCode와 changePassword 필드만 입력해주세요")
    @PostMapping("/authPassword")
    public ResponseEntity verifyRandomPassword(@RequestBody @Valid EmailDto emailDto){

        emailService.verifyRandomPassword(emailDto);

        return new ResponseEntity(HttpStatus.OK);
    }

}
