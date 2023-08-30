package WOOMOOL.DevSquad.stacktag.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
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

    public List<StackTag> selectStackTag(List<String> stacks) {
        if(stacks==null && stacks.isEmpty())
            return null;
        List<StackTag> stackTags = new ArrayList<>();
        stackTags = stacks.stream()
                .map(stack -> findverifiedStackTag(stack))
                .collect(Collectors.toList());

        return stackTags;
    }

    public List<StackTag> getStackTags(String keyword) {
        List<StackTag> result = new ArrayList<>();
        if(keyword==null)
            result = stackTagRepository.findAll(Sort.by(Sort.Direction.ASC,"tagName"));
        else
            result = stackTagRepository.findByKeyword(keyword);

        return result;
    }
    public StackTag findverifiedStackTag(String stack) {
        Optional<StackTag> stackTag = stackTagRepository.findByTagName(stack);
        StackTag findStackTag = stackTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STACK_NOT_FOUND));

        return findStackTag;
    }
}
