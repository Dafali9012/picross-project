package com.gameServer.picross.rest;


import com.gameServer.picross.entity.User;
import com.gameServer.picross.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User userToBeCreated) {
        return userRepository.save(userToBeCreated);
    }


}
