package com.osmya.ecommerceapi.controller;

import com.osmya.ecommerceapi.dto.UpdateUserRoleRequest;
import com.osmya.ecommerceapi.model.User;
import com.osmya.ecommerceapi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PatchMapping("/{id}/role")
    public User updateUserRole(@PathVariable Long id, @RequestBody UpdateUserRoleRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String newRole = request.getRole();
        if (!"ADMIN".equals(newRole) && !"CUSTOMER".equals(newRole)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role");
        }

        user.setRole(newRole);
        return userRepository.save(user);
    }
}
