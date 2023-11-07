package WOOMOOL.DevSquad.member.dto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
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
    @ApiModelProperty(value = "이메일",example = "email@email.com",required = true)
    private String email;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]{8,20}$",
            message = "비밀번호는 하나 이상의 영문, 숫자, 특수 문자를 포함, 8~20자리 입니다.")
    @ApiModelProperty(value = "비밀번호", example = "abcde123!@",required = true)
    private String password;

    @NotBlank(message = "닉네임을 입력해주세요")
    @Pattern(regexp = "^[A-Za-z0-9가-힣]{2,10}$",
            message = "닉네임은 2~10글자로 이루어져야 합니다.")
    @ApiModelProperty(value = "닉네임", example = "닉네임",required = true)
    private String nickname;

}
