package com.cicosy.tenant_management.security.services;

import com.cicosy.tenant_management.security.models.User;
import com.cicosy.tenant_management.security.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Slf4j
@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    //Get All Users
    public List<User> findAll() {
        return userRepository.findAll();
    }


    public User findByUsername(String username){
         return  userRepository.findByUsername(username);
    }



    //Get User By Id
    public User findById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    //Delete User
    public void delete(int id) {
        userRepository.deleteById(id);
    }

    //Update User
    public String save(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User user2=userRepository.findByUsername(user.getUsername());
        String status="";
        if(user2!=null){

           status="Username is already taken";
           System.out.println(("Username is already taken"));
           //throw new IllegalStateException("Username is already taken");
        }else {
            userRepository.save(user);
            status="Account Created Successful";
            System.out.println(("Account Created Successful"));
        }
        return  status;
    }

    public void UpadateProfile(User user,String username) {

       // user.setPassword(encoder.encode(user.getPassword()));
      List<User> all=userRepository.findAll();
        User user2=userRepository.findByUsername(username);
     if(user.getUsername().equals(user2.getUsername())) {
            System.out.println("Users are same");
     }
             else{
      for (int i=0;i<all.size();i++){
          if(all.get(i).getUsername().equals(user.getUsername())){
              throw new IllegalStateException("Username already taken");
          }
        }
     }



        String status="";
        if(user2!=null){
            user2.setEmail(user.getEmail());
            user2.setFirstname(user.getFirstname());
            user2.setUsername(user.getUsername());
            user2.setPhone(user.getPhone());
            user2.setLastname(user.getLastname());

            userRepository.save(user2);

            System.out.println("User Name : " + user.getUsername());
            System.out.println("First Name : " + user.getFirstname());
            System.out.println("Last Name : " + user.getLastname());
            System.out.println("Email   : " + user.getEmail());
            System.out.println(("Profile Updated Successfully"));

        }else {

            System.out.println(("User not Found"));
            throw new IllegalStateException("User not Found");

        }

    }




    public void setProfile(String username, MultipartFile file) throws IOException {
    User user = userRepository.findByUsername(username);


    if (user!=null){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String e= StringUtils.cleanPath(file.getContentType());

        String DocumentPath=System.getProperty("user.dir")+ File.separator+"uploads"+File.separator+"Profiles";

        if (!Files.exists(Paths.get(DocumentPath), new LinkOption[0])) {
            Files.createDirectories(Paths.get(DocumentPath));
        }
        if(fileName.contains(" "))
        {
            fileName= fileName.replace(" ","_");
        }
        byte[]  data =file.getBytes();
        Path path = Paths.get(DocumentPath+File.separator+fileName);
        Files.write(path,data, new LinkOption[0]);
        user.setPhoto(fileName);
                userRepository.save(user);
                System.out.println("Record saved : "+ fileName );
                System.out.println("file extension : "+ e );
            }else{
                throw new IllegalStateException(" User doesnt exist");
            }

    }
}
