package WOOMOOL.DevSquad.auth.userdetails;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

import static WOOMOOL.DevSquad.exception.ExceptionCode.MEMBER_NOT_FOUND;
import static WOOMOOL.DevSquad.exception.ExceptionCode.QUITED_MEMBER;
import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_QUIT;

@Component
@Slf4j
public class UserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final MemberAuthority memberAuthority;

    public UserDetailService(MemberRepository memberRepository, MemberAuthority memberAuthority) {
        this.memberRepository = memberRepository;
        this.memberAuthority = memberAuthority;
    }

    // 유저디테일 생성
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info(username);

        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        //todo:예외처리하기
        Member findMember = optionalMember.orElseThrow(()-> new BusinessLogicException(MEMBER_NOT_FOUND));
        if (findMember.getMemberProfile().getMemberStatus().equals(MEMBER_QUIT)) {
            throw new BusinessLogicException(QUITED_MEMBER);
        }
            return new MemberDetail(findMember);
        }
        private class MemberDetail extends Member implements UserDetails {

            MemberDetail(Member member) {
                setMemberId(member.getMemberId());
                setNickname(member.getNickname());
                setEmail(member.getEmail());
                setPassword(member.getPassword());
                setRoles(member.getRoles());
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return memberAuthority.createAuthority(this.getRoles());
            }

            @Override
            public String getUsername() {
                return getEmail();
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        }
    }
