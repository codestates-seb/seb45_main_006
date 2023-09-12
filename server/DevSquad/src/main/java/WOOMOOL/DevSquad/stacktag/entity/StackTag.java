package WOOMOOL.DevSquad.stacktag.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StackTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stackTagId;

    private String tagName;

    @ManyToMany(mappedBy = "stackTags")
    private List<MemberProfile> memberProfiles = new ArrayList<>();

    @ManyToMany(mappedBy = "stackTags")
    private List<Study> studyBoardList = new ArrayList<>();

    @ManyToMany(mappedBy = "stackTags")
    private List<Project> projectBoardList = new ArrayList<>();
}
