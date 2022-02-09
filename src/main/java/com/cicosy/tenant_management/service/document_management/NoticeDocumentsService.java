/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;




import com.cicosy.tenant_management.model.document_management.NoticeDocuments;
import com.cicosy.tenant_management.repository.document_management.NoticeDocumentRepo;
import java.io.IOException;
import java.util.List;

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
public class NoticeDocumentsService {

  @Autowired
  private NoticeDocumentRepo noticeRepo;

  public NoticeDocuments store(MultipartFile file) throws IOException {
      
      
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    NoticeDocuments documents = new NoticeDocuments(fileName, file.getContentType(), file.getBytes());

    return noticeRepo.save(documents);
  }

  public NoticeDocuments getFile(String id) {
    return noticeRepo.findById(id).get();
  }
  
  public Stream<NoticeDocuments> getAllFiles() {
    return noticeRepo.findAll().stream();
  }
  public Optional<NoticeDocuments> findOne(String id) {
        return noticeRepo.findById(id);
  }
  
  public NoticeDocuments storeDetails(NoticeDocuments noticeDocuments){
      return noticeRepo.save(noticeDocuments);
      
  }
  
      // Read operation
  
  public List<NoticeDocuments> fetchTenantDocuments()
  {
      return (List<NoticeDocuments>)
            noticeRepo.findAll();
  }
  public NoticeDocuments getNoticeDocumentsById(String Id) {
        Optional < NoticeDocuments > optional = noticeRepo.findById(Id);
        NoticeDocuments documents = null;
        if (optional.isPresent()) {
            documents = optional.get();
        } else {
            throw new RuntimeException(" Document not found for id :: " + Id);
        }
        return documents;
    }

  
    public void deleteDocumentById(String Id) {
        this.noticeRepo.deleteById(Id);
    }
 
  
  
}