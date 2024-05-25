package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.repository.AuthUserRepository;
import de.studytrade.studytradebackend.service.UserInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserInterface userService;

    @GetMapping
    public ResponseEntity<List<AuthUser>> getAllUsers() {
        return new ResponseEntity<List<AuthUser>>(userService.allUsers(), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody AuthUser user){
        try {
            if(!userService.addUser(user)){
                throw new RuntimeException("User already exists");
            }
            return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<AuthUser>> getSingleUser(@PathVariable int userId) {
        return new ResponseEntity<Optional<AuthUser>>(userService.singleUser(userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Integer>> getFavorites(@PathVariable int userId) {
        return new ResponseEntity<List<Integer>>(userService.favorites(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody AuthUser user) {
        try {
            userService.addUser(user);
            return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody AuthUser userRequest) {
        try {
            userService.updateUser(userRequest);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update user: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<String> updateFavorites(@PathVariable int userId,
            @PathVariable int productId) {
        try {
            userService.updateFavorites(userId, productId);
            return new ResponseEntity<>("Favorites updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update favorites: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<String> deleteFavorite(@PathVariable int userId, @PathVariable int productId) {
        try {
            userService.deleteFavorite(userId, productId);
            return new ResponseEntity<>("Favorite deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete favorite: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
