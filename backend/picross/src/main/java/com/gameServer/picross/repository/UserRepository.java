package com.gameServer.picross.repository;

import com.gameServer.picross.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByName(String name);
    User findById(String email);
    List<User> findAllByName(String name);
}
