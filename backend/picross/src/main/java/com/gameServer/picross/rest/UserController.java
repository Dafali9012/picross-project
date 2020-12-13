package com.gameServer.picross.rest;


import com.gameServer.picross.entity.User;
import com.gameServer.picross.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @GetMapping("/all")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable(value = "id") long id){
      return userRepository.findById(id);
    }

    @GetMapping("/name={name}")
    public User getUserByName(@PathVariable(value = "name") String name){
        System.out.println("Name "+name);
       return userRepository.findByName(name);
    }

    @PostMapping
    public User createUser(@RequestBody User userToBeCreated) {
        return userRepository.save(userToBeCreated);
    }


}
