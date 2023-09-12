package WOOMOOL.DevSquad.aop;

import WOOMOOL.DevSquad.level.service.LevelService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class levelAspect {
    private LevelService levelService;

    public levelAspect(LevelService levelService) {
        this.levelService = levelService;
    }

    // 활동 공통 기능
    @Pointcut("execution(public * WOOMOOL.DevSquad.projectboard.service..*(..)) ||" +
            "execution(public * WOOMOOL.DevSquad.studyboard.service..*(..)) ||" +
            "execution(public * WOOMOOL.DevSquad.infoboard.service..*(..)) ||" +
            "execution(public * WOOMOOL.DevSquad.questionboard.service..*(..))")
    public void afterActivity(){}

    // 활동 후 레벨링 메서드 실행
    @After("afterActivity()")
    public void leveling(JoinPoint joinPoint){

        levelService.leveling();
    }

}