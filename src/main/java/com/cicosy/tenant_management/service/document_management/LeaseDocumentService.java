package com.cicosy.tenant_management.service.document_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;



import com.cicosy.tenant_management.controler.document_management.exception.FileNotFoundException;
import com.cicosy.tenant_management.controler.document_management.exception.FileStorageException;
import com.cicosy.tenant_management.model.document_management.LeaseDocuments;
import com.cicosy.tenant_management.repository.document_management.LeaseDocumentsRepo;


import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional	
public class LeaseDocumentService  {

	@Autowired
	LeaseDocumentsRepo leaseDocumentsRepo;
	
	public static String uploadDirectory = System.getProperty("user.dir")+"/uploads/lease";
	private final Path fileStorageLocation= Paths.get(uploadDirectory)
			.toAbsolutePath().normalize();
	
	public String saveFile(MultipartFile file,LeaseDocuments leaseDocuments) throws IOException {
		// Save Employee With File

		leaseDocumentsRepo.save(leaseDocuments);
		return "success";
	}

	
	public Resource loadFileAsResource(String fileName) {
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

