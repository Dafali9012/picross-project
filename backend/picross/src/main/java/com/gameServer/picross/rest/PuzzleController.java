package com.gameServer.picross.rest;

import com.gameServer.picross.entity.puzzle.Puzzle;
import com.gameServer.picross.repository.PuzzleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/puzzle")
public class PuzzleController {

    @Autowired
    private PuzzleRepository puzzleRepository;

    @GetMapping
    public Iterable<Puzzle> getAllPuzzle(){
        return puzzleRepository.findAll();
    }


    @PostMapping
    public Puzzle addPuzzle(@RequestBody Puzzle newPuzzle){
        return puzzleRepository.save(newPuzzle);
    }


}
