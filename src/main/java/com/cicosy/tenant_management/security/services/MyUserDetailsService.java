package com.cicosy.tenant_management.security.services;

import com.cicosy.tenant_management.model.ProductToken.ProductToken;
import com.cicosy.tenant_management.repository.ProductToken.ProductTokenRepo;
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

    @Autowired
    private ProductTokenRepo productTokenRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
           
        }
        return new UserPrincipal(user);
    }
    public String loadByToken(String token) throws UsernameNotFoundException{
        ProductToken productToken = productTokenRepo.findByToken(token);

        if (productToken==null){
            System.out.println("Token not found");
            throw new UsernameNotFoundException("Token not found");
        }else{
            System.out.println("Token found"+productToken);
            return "/company";
        }

    }

}
