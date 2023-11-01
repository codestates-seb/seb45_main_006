package WOOMOOL.DevSquad.notification.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class EmitterRepository {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    // emitter 저장
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    // 해당 회원의 모든 emitter 찾기
    public Map<String, SseEmitter> findAllEmitterByMemberId(String memberId){
        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(memberId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
    // emitter 삭제
    public void deleteById(String id){
        emitters.remove(id);
    };

    // 해당 회원의 모든 emitter 삭제
    public void deleteAllEmitterByMemberId(String memberId){
        emitters.forEach(
                (id,emitter) -> {
                    if(id.startsWith(memberId)){
                        emitters.remove(id);
                    }
                }
        );

    }
}
