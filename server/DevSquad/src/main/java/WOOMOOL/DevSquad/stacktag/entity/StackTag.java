package WOOMOOL.DevSquad.stacktag.entity;

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

//    @ManyToMany(mappedBy = "stackTags")
//    private List<> memberList = new ArrayList<>();
//    @ManyToMany(mappedBy = "stackTags")
//    private List<> studyboardList = new ArrayList<>();
//    @ManyToMany(mappedBy = "stackTags")
//    private List<> projectboardList = new ArrayList<>();
}
