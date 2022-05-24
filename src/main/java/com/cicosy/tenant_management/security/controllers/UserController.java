package com.cicosy.tenant_management.security.controllers;

import com.cicosy.tenant_management.security.models.User;
import com.cicosy.tenant_management.security.repositories.UserRepository;
import com.cicosy.tenant_management.security.services.RoleService;
import com.cicosy.tenant_management.security.services.UserService;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

@Slf4j
@Controller
public class UserController {



    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/editProfile")
    public String getUser() {
        return "userEdit";
    }


 @PostMapping("/editProfileImage/{username}" )
    public RedirectView addNew(RedirectAttributes redir,
        @PathVariable String username,
        @RequestParam(required = true, value = "file") MultipartFile file) throws IOException {

      userService.setProfile(username, file);
     RedirectView redirectView = new RedirectView("/editProfile", true);
     //redir.addFlashAttribute("message", "You have successfully registered a new user!");
       // return "redirect:/editProfile";
     return redirectView;
    }


    @GetMapping("/security/users")
    public String getAll(Model model) {
        model.addAttribute("users", userService.findAll());
        return "/users";
    }

    @GetMapping("/security/user/{op}/{id}")
    public String editUser(@PathVariable Integer id, @PathVariable String op, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        model.addAttribute("userRoles", roleService.getUserRoles(user));
        model.addAttribute("userNotRoles", roleService.getUserNotRoles(user));
        return "/security/user" + op; //returns employeeEdit or employeeDetails
    }

    @PostMapping("/users/addNew")
    public RedirectView addNew(User user, RedirectAttributes redir) {

        String status= userService.save(user);

        RedirectView redirectView=null;
        redir.addFlashAttribute("message", status);

        if(status=="Account Created Successful"){
            redirectView = new RedirectView("/login", true);
        }else{
            redirectView = new RedirectView("/register", true);
        }


        return redirectView;
    }



}
