/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;



import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.repository.document_management.TenantsDocumentRepo;
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
public class TenantDocumentsService {

  @Autowired
  private TenantsDocumentRepo tenantRepo;

  public TenantDocuments store(MultipartFile file) throws IOException {
      
      
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    TenantDocuments documents = new TenantDocuments(fileName, file.getContentType(), file.getBytes());

    return tenantRepo.save(documents);
  }

  public TenantDocuments getFile(String id) {
    return tenantRepo.findById(id).get();
  }
  
  public Stream<TenantDocuments> getAllFiles() {
    return tenantRepo.findAll().stream();
  }

  public TenantDocuments getTenantDocumentsById(String Id) {
        Optional < TenantDocuments > optional = tenantRepo.findById(Id);
        TenantDocuments documents = null;
        if (optional.isPresent()) {
            documents = optional.get();
        } else {
            throw new RuntimeException(" Document not found for id :: " + Id);
        }
        return documents;
    }

  
    public void deleteDocumentById(String Id) {
        this.tenantRepo.deleteById(Id);
    }
 
  
  
}