package com.cicosy.tenant_management.security.services;

import com.cicosy.tenant_management.security.models.User;
import com.cicosy.tenant_management.security.models.UserPrincipal;
import com.cicosy.tenant_management.security.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
           
        }
        return new UserPrincipal(user);
    }
}
