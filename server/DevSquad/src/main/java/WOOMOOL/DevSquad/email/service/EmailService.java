package WOOMOOL.DevSquad.email.service;

import WOOMOOL.DevSquad.email.dto.EmailDto;
import WOOMOOL.DevSquad.email.entity.Email;
import WOOMOOL.DevSquad.email.repository.EmailRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.member.dto.PasswordDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.SecureRandom;
import java.util.Optional;

import static WOOMOOL.DevSquad.exception.ExceptionCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final EmailRepository emailRepository;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    // 인증번호 8자리 생성
    public void createAuthMail(Email email) throws MessagingException {
        // 인증 번호 생성
        String authCode = generateRandomCode();
        String receiver = email.getEmail();

        // 요청으로 들어온 email 을 가진 회원이 있으면 Exception
        memberService.verifyExistEmail(receiver);

        String title = "DevSquad 개울가에 합류하실래요?";
        String templates = "email-templates";

        sendEmail(title, receiver, authCode, templates);

    }


    public void createFindPasswordEmail(Email email) throws MessagingException {

        // 비밀번호를 찾을 이메일
        String receiver = email.getEmail();
        // 이메일로 회원 찾기
        Optional<Member> optionalMember = memberRepository.findRegularUserByEmail(receiver);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
        // 랜덤 비밀번호 생성
        String randomPassword = generateRandomCode();
        // 랜덤 비밀번호 넣기
        String encodedPassword = passwordEncoder.encode(randomPassword);
        findMember.setPassword(encodedPassword);

        String title = "비밀번호를 잊어버리셨나요?";
        String templates = "findPassword-templates";
        sendEmail(title, receiver, randomPassword, templates);

    }

    // 요청으로 보낸 코드와 DB에 있는 인증 코드 확인
    public void verifyAuthCode(Email email) {

        // 요청으로 받은 이메일로 인증 정보 찾기
        Email findEmail = emailRepository.findByEmail(email.getEmail());

        // 요청 코드랑 인증정보 코드가 다르면 exception
        if (!findEmail.getAuthCode().equals(email.getAuthCode())) {
            throw new BusinessLogicException(UNMATCHED_CODE);
        }

        // 확인된 인증은 삭제
        emailRepository.delete(findEmail);
    }

    public void verifyRandomPassword(EmailDto emailDto){

        // 요청으로 받은 이메일로 인증 정보 찾기
        Email findEmail = emailRepository.findByEmail(emailDto.getEmail());

        // 요청 코드랑 인증정보 코드가 다르면 exception
        if(!findEmail.getAuthCode().equals(emailDto.getAuthCode())){
            throw new BusinessLogicException(UNMATCHED_PASSWORD);
        }

        // 인증이 되면 해당 이메일의 Member 객체를 찾고
        Optional<Member> optionalMember = memberRepository.findByEmail(emailDto.getEmail());
        Member findMember = optionalMember.orElseThrow();

        // 요청으로 온 변경할 비밀번호를 Password 필드에 넣어주기
        String encodedPassword = passwordEncoder.encode(emailDto.getChangePassword());
        findMember.setPassword(encodedPassword);

        // 확인된 인증은 삭제
        emailRepository.delete(findEmail);
    }

    private void sendEmail(String title, String receiver, String code, String templates) throws MessagingException {

        // 인증 번호 재발송 시 전에 있던 인증 정보 삭제
        Email findEmail = emailRepository.findByEmail(receiver);
        if (findEmail != null) {
            emailRepository.delete(findEmail);
        }

        // 템플릿 만들기
        Context context = new Context();
        context.setVariable("email", receiver);
        context.setVariable("authCode", code);

        String message = templateEngine.process(templates, context);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

        String sender = "DevSquad<aokagami03@gmail.com>";

        mimeMessageHelper.setSubject(title);
        mimeMessageHelper.setTo(receiver);
        mimeMessageHelper.setFrom(sender);
        mimeMessageHelper.setText(message, true);


        Email email = Email.builder()
                .email(receiver)
                .authCode(code)
                .build();

        // 이메일과 인증코드 저장
        emailRepository.save(email);

        // 메일 보내기
        javaMailSender.send(mimeMessage);

    }

    private String generateRandomCode() {

        SecureRandom secureRandom = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (int i = 0; i < 8; i++) {
            int randomIndex = secureRandom.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }
        return sb.toString();
    }
}
