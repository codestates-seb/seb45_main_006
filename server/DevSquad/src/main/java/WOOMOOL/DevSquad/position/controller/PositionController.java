package WOOMOOL.DevSquad.position.controller;

import WOOMOOL.DevSquad.position.entity.Position;
import WOOMOOL.DevSquad.position.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Provider;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/positions")
public class PositionController {

    private final PositionService positionService;

    @GetMapping
    public ResponseEntity getAllPosition(){

        List<Position> positionList = positionService.getAllPosition();

        return new ResponseEntity(positionList, HttpStatus.OK);
    }
}
