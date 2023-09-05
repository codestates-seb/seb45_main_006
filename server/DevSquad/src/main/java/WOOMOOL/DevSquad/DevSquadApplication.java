package WOOMOOL.DevSquad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class DevSquadApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevSquadApplication.class, args);
	}

}
