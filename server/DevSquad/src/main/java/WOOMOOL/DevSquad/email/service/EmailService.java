package WOOMOOL.DevSquad.email.service;

import WOOMOOL.DevSquad.email.entity.Email;
import WOOMOOL.DevSquad.email.repository.EmailRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;

import static WOOMOOL.DevSquad.exception.ExceptionCode.UNMATCHED_CODE;

//@Service
//@Transactional
//public class EmailService {
//
//    private final JavaMailSender javaMailSender;
//    private final TemplateEngine templateEngine;
//    private final EmailRepository emailRepository;
//
//    private final MemberService memberService;
//
//    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine, EmailRepository emailRepository, MemberService memberService) {
//        this.javaMailSender = javaMailSender;
//        this.templateEngine = templateEngine;
//        this.emailRepository = emailRepository;
//        this.memberService = memberService;
//    }
//
//    // 인증번호 8자리 생성
//    public void createMail(Email email) throws MessagingException {
//        // 인증 번호 생성
//        String authCode = generateRandomCode();
//        String receiver = email.getEmail();
//
//        // 요청으로 들어온 email 이 만약 있으면 Exception
//        memberService.verifyExistEmail(receiver);
//
//        // 인증 번호 재발송 시 전에 있던 인증 정보 삭제
//        Email findEmail = emailRepository.findByEmail(receiver);
//        if(findEmail != null){
//            emailRepository.delete(findEmail);
//        }
//
//        // 템플릿 만들기
//        Context context = new Context();
//        context.setVariable("email", receiver);
//        context.setVariable("authCode", authCode);
//
//        String message = templateEngine.process("email-templates", context);
//
//        String title = "DevSquad 개울가에 합류하실래요?";
//        String sender = "DevSquad";
//
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//
//        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
//
//        mimeMessageHelper.setSubject(title);
//        mimeMessageHelper.setTo(receiver);
//        mimeMessageHelper.setFrom(sender);
//        mimeMessageHelper.setText(message, true);
//
//        // 이메일과 인증코드 저장
//        Email authMail = Email.builder()
//                .email(receiver)
//                .authCode(authCode)
//
//                .build();
//
//        emailRepository.save(authMail);
//
//        // 메일 보내기
//        javaMailSender.send(mimeMessage);
//
//    }
//
//    // 요청으로 보낸 코드와 DB에 있는 인증 코드 확인
//    public void verifyAuthCode(Email email) {
//
//        Email findEmail = emailRepository.findByEmail(email.getEmail());
//
//        if (!findEmail.getAuthCode().equals(email.getAuthCode())) {
//            throw new BusinessLogicException(UNMATCHED_CODE);
//        }
//
//        // 확인된 인증은 삭제
//        emailRepository.delete(findEmail);
//    }
//
//    private String generateRandomCode() {
//
//        SecureRandom secureRandom = new SecureRandom();
//        StringBuilder sb = new StringBuilder();
//
//        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//
//        for (int i = 0; i < 8; i++) {
//            int randomIndex = secureRandom.nextInt(chars.length());
//            sb.append(chars.charAt(randomIndex));
//        }
//        return sb.toString();
//    }
//}
