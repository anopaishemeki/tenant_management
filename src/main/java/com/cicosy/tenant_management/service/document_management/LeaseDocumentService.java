/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;



import com.cicosy.tenant_management.model.document_management.LeaseDocuments;

import com.cicosy.tenant_management.repository.document_management.LeaseDocumentsRepo;

import java.io.IOException;


import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;



/**
 *
 * @author Dejong
 */







@Service
public class LeaseDocumentService {

  @Autowired
  private LeaseDocumentsRepo leaseRepo;
 

  public LeaseDocuments store(MultipartFile file) throws IOException {
      
      
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
 
    LeaseDocuments leaseDocuments = new LeaseDocuments(fileName, file.getContentType(), file.getBytes());
    if(fileName.contains(".."))
    {
        System.out.println("not a a valid file");
    } 
    

 
    
    
    return leaseRepo.save(leaseDocuments);
  }

  public LeaseDocuments getFile(String Id) {
    return leaseRepo.findById(Id).get();
  }
  
  public Stream<LeaseDocuments> getAllFiles() {
    return leaseRepo.findAll().stream();
  }

 
  public LeaseDocuments getLeaseDocumentsById(String Id) {
        Optional < LeaseDocuments > optional = leaseRepo.findById(Id);
        LeaseDocuments documents = null;
        if (optional.isPresent()) {
            documents = optional.get();
        } else {
            throw new RuntimeException(" Documents not found for id :: " + Id);
        }
        return documents;
    }

  
    public void deleteDocumentById(String Id) {
        this.leaseRepo.deleteById(Id);
    }
    
    public LeaseDocuments storeDates(LeaseDocuments leaseDocuments){
        
        
        return leaseRepo.save(leaseDocuments);
    } 

}
           
      
       
           
           
       
          
         
       
     
  
