//package WOOMOOL.DevSquad.email.controller;
//
//import WOOMOOL.DevSquad.email.dto.EmailDto;
//import WOOMOOL.DevSquad.email.entity.Email;
//import WOOMOOL.DevSquad.email.mapper.EmailMapper;
//import WOOMOOL.DevSquad.email.service.EmailService;
//import lombok.Getter;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.mail.MessagingException;
//import javax.validation.Valid;
//import java.io.UnsupportedEncodingException;
//
//@RestController
//@RequestMapping("/email")
//public class EmailController {
//
//    private final EmailService emailService;
//    private final EmailMapper emailMapper;
//
//    public EmailController(EmailService emailService, EmailMapper emailMapper) {
//        this.emailService = emailService;
//        this.emailMapper = emailMapper;
//    }
//
//    // 메일 보내기
//    @PostMapping("/send")
//    public ResponseEntity sendAuthEmail(@RequestBody @Valid EmailDto emailDto) throws MessagingException, UnsupportedEncodingException {
//
//        Email email = emailMapper.postDtoToEntity(emailDto);
//        emailService.createMail(email);
//
//        return new ResponseEntity(HttpStatus.OK);
//
//    }
//
//    // 인증 확인
//    @GetMapping("/auth")
//    public ResponseEntity verifyAuthCode(@RequestBody @Valid EmailDto emailDto){
//
//        Email email = emailMapper.postDtoToEntity(emailDto);
//        emailService.verifyAuthCode(email);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//}
