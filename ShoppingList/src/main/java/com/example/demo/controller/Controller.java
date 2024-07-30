package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.Repository;

@RestController
public class Controller {

    @Autowired
    private Repository repository;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return repository.save(newUser);
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/user")
    List<User> getAllUser(){
    	return repository.findAll();
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return repository.findById(id)
        		.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/user/{id}")
    public String deleteUserById(@PathVariable Long id) {
    	repository.deleteById(id);
    	return "Successfully deleted";
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/user/{id}")
    public User updateUserById(@RequestBody User newUser ,@PathVariable Long id) {
    	return repository.findById(id).map(user->{
    		user.setName(newUser.getName());
    		user.setUse(newUser.getUse());
    		user.setCost(newUser.getCost());
    		user.setQuantity(newUser.getQuantity());
    		return repository.save(user);
    	}).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

}
