package WOOMOOL.DevSquad.stacktag.repository;

import WOOMOOL.DevSquad.stacktag.entity.StackTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StackTagRepository extends JpaRepository<StackTag,Long> {
    //스택이름을 DB에서 찾아 반환
    StackTag findByTagName(String stack);
    //입력된 검색어가 포함되어 있는 스택태그들을 반환 (검색어로 시작하는 스택들의 순서를 앞으로 하는 기능 아직 미구현)
    //ORDER BY 줄은 작동하지만 제대로 작동하진않아서 일단 놔둠
    @Query("SELECT t FROM StackTag t WHERE LOWER(t.tagName) " +
            "LIKE CONCAT('%',LOWER(:keyword),'%') " +
            "ORDER BY CASE WHEN t.tagName LIKE CONCAT(LOWER(:keyword),'%') THEN 0 ELSE 1 END, t.tagName")
    List<StackTag> findByKeyword(String keyword);
}
