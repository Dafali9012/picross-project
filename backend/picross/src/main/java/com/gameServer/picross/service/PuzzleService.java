package com.gameServer.picross.service;

import com.gameServer.picross.repository.PuzzleRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PuzzleService {

    @Autowired
    PuzzleRepository puzzleRepository;
}
