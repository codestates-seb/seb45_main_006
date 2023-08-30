package WOOMOOL.DevSquad.stacktag.repository;

import WOOMOOL.DevSquad.stacktag.entity.StackTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StackTagRepository extends JpaRepository<StackTag,Long> {
    Optional<StackTag> findByTagName(String stack);
    @Query("SELECT t FROM StackTag t WHERE LOWER(t.tagName) " +
            "LIKE CONCAT('%',LOWER(:keyword),'%') " +
            "ORDER BY CASE WHEN t.tagName LIKE CONCAT(LOWER(:keyword),'%') THEN 0 ELSE 1 END, t.tagName")
    List<StackTag> findByKeyword(String keyword);
}
