package WOOMOOL.DevSquad.projectBoard.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn
    public abstract class Board {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long boardId;
    }
