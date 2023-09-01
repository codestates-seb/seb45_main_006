package WOOMOOL.DevSquad.stacktag.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.position.entity.Position;
import WOOMOOL.DevSquad.stacktag.entity.StackTag;
import WOOMOOL.DevSquad.stacktag.repository.StackTagRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class StackTagService {
    private final StackTagRepository stackTagRepository;

    public StackTagService(StackTagRepository stackTagRepository) {
        this.stackTagRepository = stackTagRepository;
    }

    public void createStackTag(List<String> stackTaglist, MemberProfile memberProfile){

        // 수정시 스택 객체 초기화
        memberProfile.getStackTags().clear();

        if(stackTaglist.size() > 0) {
            for (String stackTags : stackTaglist) {
                StackTag stackTag = stackTagRepository.findByTagName(stackTags);
                stackTag.getMemberProfiles().add(memberProfile);
                memberProfile.getStackTags().add(stackTag);
            }
        }
    }

    //검색어가 있을시 스택태그검색과 없을시 검색
    public List<StackTag> getStackTags(String keyword) {
        List<StackTag> result = new ArrayList<>();
        if(keyword==null)
            result = stackTagRepository.findAll(Sort.by(Sort.Direction.ASC,"tagName"));
        else
            result = stackTagRepository.findByKeyword(keyword);

        return result;
    }
//    //DB에 있는 스택인지 검사(필요하면 쓰고 필요하지않으면 나중에 삭제 예정)
//    public StackTag findverifiedStackTag(String stack) {
//        Optional<StackTag> stackTag = stackTagRepository.findByTagName(stack);
//        StackTag findStackTag = stackTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STACK_NOT_FOUND));
//
//        return findStackTag;
//    }
}
