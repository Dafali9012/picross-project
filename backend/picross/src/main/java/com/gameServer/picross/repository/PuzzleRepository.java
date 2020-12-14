package com.gameServer.picross.repository;

import com.gameServer.picross.entity.puzzle.Puzzle;
import org.springframework.data.repository.CrudRepository;

public interface PuzzleRepository extends CrudRepository< Puzzle, Integer> {
    Puzzle findById(long id);
    Puzzle findByName(String name);

}
