package WOOMOOL.DevSquad.position.service;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.position.entity.Position;
import WOOMOOL.DevSquad.position.repository.PositionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class PositionService {
    private final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    // DB에 설정해놓은 Position 객체를 찾아서 프로필에 넣어줌
    // 유저 프로필 수정시 Position 생성 메서드
    public void createPosition(Set<String> positionList, MemberProfile memberProfile){

        // 수정시 포지션 객체 초기화
        memberProfile.getPositions().clear();

        if(positionList.size() > 0) {
            for (String positions : positionList) {
                Position position = positionRepository.findByPositionName(positions);
                position.getMemberProfiles().add(memberProfile);
                memberProfile.getPositions().add(position);
            }
        }
    }
}
