package WOOMOOL.DevSquad.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@Valid
public class MemberPostDto {
    @NotBlank(message = "이메일을 입력해주세요")
    @Email(message = "올바른 이메일 형식을 사용해주세요")
    private String email;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]{8,20}$",
            message = "비밀번호는 하나 이상의 영문, 숫자, 특수 문자를 포함, 8~20자리 입니다.")
    private String password;

    @NotBlank(message = "닉네임을 입력해주세요")
    @Pattern(regexp = "^[A-Za-z0-9가-힣]{2,10}$",
            message = "닉네임은 2~10글자로 이루어져야 합니다.")
    private String nickname;

}
