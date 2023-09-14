package WOOMOOL.DevSquad.level.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

public class LevelDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{

        private Long memberId;

        private String grade;

        private int currentExp;

        private int maxExp;
    }
}
