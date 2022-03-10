package com.cicosy.tenant_management.service.document_management;

import com.cicosy.tenant_management.model.document_management.ExpiredLeaseDocuments;
import com.cicosy.tenant_management.model.document_management.ReplyDocuments;
import com.cicosy.tenant_management.repository.document_management.ExpiredDocumentsRepo;
import com.cicosy.tenant_management.repository.document_management.ReplyDocumentsRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class ReplyService {

    @Autowired
    private ReplyDocumentsRepo replyDocumentsRepo;

    public ReplyService(ReplyDocumentsRepo replyDocumentsRepo){

        this.replyDocumentsRepo=replyDocumentsRepo;
    }

    public String storeDetails(ReplyDocuments replyDocuments){
		// Save Employee With File
		replyDocumentsRepo.save(replyDocuments);
		return "success";
	}
    public void getEx(Long id){
        replyDocumentsRepo.findById(id);
    }



}

  
    

