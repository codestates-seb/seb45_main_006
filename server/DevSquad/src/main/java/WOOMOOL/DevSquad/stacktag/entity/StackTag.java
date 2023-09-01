package WOOMOOL.DevSquad.stacktag.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
//    @ManyToMany(mappedBy = "stackTags")
//    private List<> studyboardList = new ArrayList<>();
//    @ManyToMany(mappedBy = "stackTags")
//    private List<> projectboardList = new ArrayList<>();
}
