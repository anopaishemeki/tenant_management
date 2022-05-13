package com.cicosy.tenant_management.security.controllers;


import com.cicosy.tenant_management.security.models.User;
import com.cicosy.tenant_management.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestContoller {

    @Autowired
    private UserService userService;

    @PutMapping("/updateUser/{username}")
    public void updateProfile(@RequestBody User user , @PathVariable String username) {

        userService.UpadateProfile(user ,username);
    }
}
