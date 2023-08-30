package WOOMOOL.DevSquad.board;

import WOOMOOL.DevSquad.comment.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
public abstract class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    @OneToMany(mappedBy = "board")
    private List<Comment> commentList = new ArrayList<>();
}
