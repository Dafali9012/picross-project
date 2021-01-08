package com.gameServer.picross.rest;

import com.gameServer.picross.entity.puzzle.Puzzle;
import com.gameServer.picross.repository.PuzzleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/puzzle")
public class PuzzleController {

    @Autowired
    private PuzzleRepository puzzleRepository;

    @GetMapping("/all")
    public Iterable<Puzzle> getAllPuzzle(){
        return puzzleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Puzzle getPuzzleById(@PathVariable(value = "id") long id){
        return puzzleRepository.findById(id);
    }

    @GetMapping("/name={name}")
    public Puzzle getPuzzleByName(@PathVariable(value = "name") String name){
        return puzzleRepository.findByName(name);
    }


    @PostMapping
    public Puzzle addPuzzle(@RequestBody Puzzle newPuzzle){
        return puzzleRepository.save(newPuzzle);
    }


}
