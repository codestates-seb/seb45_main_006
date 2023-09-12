package WOOMOOL.DevSquad.email.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class EmailDto {
    @Email
    private String email;
    private String authCode;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]{8,20}$",
            message = "비밀번호는 하나 이상의 영문, 숫자, 특수 문자를 포함, 8~20자리 입니다.")
    private String changePassword;
}
