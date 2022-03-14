package com.cicosy.tenant_management.service.document_management;


import java.util.List;

import com.cicosy.tenant_management.model.document_management.ExpiredLeaseDocuments;
import com.cicosy.tenant_management.repository.document_management.ExpiredDocumentsRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class ExpiredLeaseService {

    @Autowired
    private ExpiredDocumentsRepo expiredDocumentsRepo;

    public ExpiredLeaseService(ExpiredDocumentsRepo expiredDocumentsRepo){

        this.expiredDocumentsRepo=expiredDocumentsRepo;
    }

    public String storeDetails(ExpiredLeaseDocuments expiredLeaseDocuments){
		// Save Employee With File
		expiredDocumentsRepo.save(expiredLeaseDocuments);
		return "success";
	}
    public ExpiredLeaseDocuments getEx(Long id)throws Exception{
        return expiredDocumentsRepo.findById(id).orElseThrow(() -> new Exception("details not found"));

        
    }
    public List<ExpiredLeaseDocuments> getAllDocuments(){

        return expiredDocumentsRepo.findAll();
    }



}

  
    

