/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;




import com.cicosy.tenant_management.model.document_management.NoticeDocuments;
import com.cicosy.tenant_management.repository.document_management.NoticeDocumentRepo;
import java.io.IOException;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




/**
 *
 * @author Dejong
 */



import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;




import com.cicosy.tenant_management.controler.document_management.exception.FileNotFoundException;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;


import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional	
public class NoticeDocumentsService  {

	@Autowired
	NoticeDocumentRepo noticeDocumentRepo;
	
	public static String uploadDirectory = System.getProperty("user.dir")+"/uploads/noticeDocuments";
	private final Path fileStorageLocation= Paths.get(uploadDirectory)
			.toAbsolutePath().normalize();
	
	public String saveFile(NoticeDocuments noticeDocuments) throws IOException {
		// Save Employee With File
		noticeDocumentRepo.save(noticeDocuments);
		return "success";
	}

	
	public Resource loadFileAsResource(String fileName,Long id) {
		try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            System.out.println(filePath+" "+resource);
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }
	}

	
}

