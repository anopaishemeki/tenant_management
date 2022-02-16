/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;



import com.cicosy.tenant_management.model.document_management.LeaseDocuments;
import com.cicosy.tenant_management.model.leaseManagement.Lease;


import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.repository.document_management.LeaseDocumentsRepo;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;


import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;




import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
  private final LeaseRepository leaseRepository;

    public LeaseDocumentService(LeaseDocumentsRepo leaseRepo, LeaseRepository leaseRepository) {
        this.leaseRepo = leaseRepo;
        this.leaseRepository = leaseRepository;
    }
  




  public LeaseDocuments store(MultipartFile file) throws IOException {

    String fileName = StringUtils.cleanPath(file.getOriginalFilename());


    LeaseDocuments leaseDocuments = new LeaseDocuments(fileName, file.getContentType(), file.getBytes());
    if(fileName.contains(".."))
    {
        System.out.println("not a a valid file");
    } 
    

 
    
    
    return leaseRepo.save(leaseDocuments);
  }

  public LeaseDocuments getFile(Long Id) {
    return leaseRepo.findById(Id).get();
  }
  
  public Stream<LeaseDocuments> getAllFiles() {
    return leaseRepo.findAll().stream();
  }

 
  public LeaseDocuments getLeaseDocumentsById(Long Id) {
        Optional < LeaseDocuments > optional = leaseRepo.findById(Id);
        LeaseDocuments documents = null;
        if (optional.isPresent()) {
            documents = optional.get();
        } else {
            throw new RuntimeException(" Documents not found for id :: " + Id);
        }
        return documents;
    }

  
    public void deleteDocumentById(Long Id) {
        this.leaseRepo.deleteById(Id);
    }
    
    public LeaseDocuments storeDates(LeaseDocuments leaseDocuments){
        
        
        return leaseRepo.save(leaseDocuments);
    }
    
    @Transactional
    public List<LeaseDocuments> getExpiredLeasesDoc(String status) {


        List<Lease> list2 = leaseRepository.findAll();
        for (int i = 0; i < leaseRepository.findAll().size(); i++) {
            Long leaseID = list2.get(i).getId();
            Lease lease = leaseRepository.findById(leaseID)
                    .orElseThrow(() -> new IllegalStateException(
                            "Record With ID " + leaseID + " Does Not Exist"
                    ));
            lease.setEndDate(lease.getStartDate().plusMonths(lease.getDuration()));

            if ((lease.getEndDate().isBefore(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus() , "Expired"))) &&
                    (!(Objects.equals(lease.getStatus(),"Terminated"))))
            {
                lease.setStatus("Expired");
            } else if ((lease.getEndDate().isAfter(LocalDate.now())) &&
                    (!(Objects.equals(lease.getStatus() , "Active"))) &&
                    (!(Objects.equals(lease.getStatus(),"Terminated"))))
            {
                lease.setStatus("Active");
            }


        }

        return leaseRepo.findExpired(status);

    }

}
           
      
       
           
           
       
          
         
       
     
  
