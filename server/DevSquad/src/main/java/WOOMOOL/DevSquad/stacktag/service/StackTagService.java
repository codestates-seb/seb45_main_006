package WOOMOOL.DevSquad.stacktag.service;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.stacktag.entity.StackTag;
import WOOMOOL.DevSquad.stacktag.repository.StackTagRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StackTagService {
    private final StackTagRepository stackTagRepository;

    public StackTagService(StackTagRepository stackTagRepository) {
        this.stackTagRepository = stackTagRepository;
    }
    public void createStackTag(Set<String> stackTagList, MemberProfile memberProfile) {

        // 수정시 스택 객체 초기화
        memberProfile.getStackTags().clear();

        if (stackTagList.size() > 0) {
            for (String stackTags : stackTagList) {
                StackTag stackTag = stackTagRepository.findByTagName(stackTags);
                stackTag.getMemberProfiles().add(memberProfile);
                memberProfile.getStackTags().add(stackTag);
            }
        }
    }

    public Set<StackTag> createBoardStackTag(Set<String> stackTaglist){
        if( stackTaglist.isEmpty() ) return null;

        Set<StackTag> stackTags = new HashSet<>();

        for(String stack : stackTaglist) {
            StackTag stackTag = stackTagRepository.findByTagName(stack);
            stackTags.add(stackTag);
        }

        return stackTags;
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
