/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;



import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.repository.document_management.TenantsDocumentRepo;
import java.io.IOException;
import java.util.List;
import com.cicosy.tenant_management.controler.document_management.exception.*;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import org.springframework.core.io.Resource;
import java.nio.file.*;
import org.springframework.core.io.UrlResource;
import java.net.MalformedURLException;
import lombok.extern.log4j.Log4j2;
import com.cicosy.tenant_management.service.document_management.FileStorageProperties;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Dejong
 */






@Log4j2
@Service
public class TenantDocumentsService {

  
  

  @Autowired
	TenantsDocumentRepo tenantsDocumentRepo;
	
	public static String uploadDirectory = System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"tenantDocuments";
	private final Path fileStorageLocation= Paths.get(uploadDirectory)
			.toAbsolutePath().normalize();
	
	public String saveFile(TenantDocuments tenantDocuments) throws IOException {
		
		tenantsDocumentRepo.save(tenantDocuments);
		return "success";
	}
  


  public void store(String tenantId,Long id,String uploadDir,String fileName, MultipartFile multipartFile) throws IOException {
 // Path uploadPath = fileStorageLocation;
      int id1 = Integer.parseInt(tenantId);
      String uploadPath=System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"TenantDocuments"+File.separator+"Tenant"+id1;
      File pathAsFile = new File(uploadPath);
  
  if (!Files.exists(Paths.get(uploadPath))) {
  Files.createDirectories(Paths.get(uploadPath));
  }
    if(fileName.contains(" "))
    {
      fileName= fileName.replace(" ","_");
    }
      byte[]  data =multipartFile.getBytes();
      Path path = Paths.get(uploadPath+File.separator+fileName);
      Files.write(path,data);


/*  try (InputStream inputStream = multipartFile.getInputStream()) {
  Path filePath = uploadPath.resolve(fileName);
  Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
  } catch (IOException ioe) {       
  throw new IOException("Could not save file: " + fileName, ioe);
  }   */
}

public Resource loadFileAsResource(Long id,String fileName) {
  /*try {


      String uploadPath="src/main/resources/static/assets/uploads/Tenant"+id;

          Path filePath = Paths.get(uploadPath).toAbsolutePath().resolve(fileName).normalize();
          Resource resource = new UrlResource(filePath.toUri());
          System.out.println(filePath+" "+resource);
          if(resource.exists()) {
              return resource;
          } else {
              throw new FileStorageException("File not found " + fileName);
          }
      } catch (MalformedURLException ex) {
          throw new FileStorageException("File not found " + fileName, ex);
      }*/
    String DocumentPath=System.getProperty("user.dir")+File.separator+ "uploads"+File.separator+"Tenant"+id;
//        File pathAsFile = new File(DocumentPath);



//        byte[]  data =file.getBytes();
//        Path path = Paths.get(DocumentPath+file.getOriginalFilename());


    Path path = Paths.get(DocumentPath).toAbsolutePath().resolve(fileName);

    Resource resource;
    try {
        resource = new UrlResource(path.toUri());

    } catch (MalformedURLException e) {
        throw new RuntimeException("Issue in reading the file", e);
    }

    if(resource.exists() && resource.isReadable()){
        return resource;
    }else{
        throw new RuntimeException("the file doesn't exist or not readable");
    }
}
        public List<TenantDocuments> findDoc(String id) {
        return tenantsDocumentRepo.findLeaseBySearch(id);
    }

/** 
public TenantDocuments store1(MultipartFile file) throws IOException {

  String fileName = StringUtils.cleanPath(file.getOriginalFilename());


  TenantDocuments tenantDocuments = new TenantDocuments(fileName, file.getContentType(), file.getBytes());
  if(fileName.contains(".."))
  {
      System.out.println("not a a valid file");
  }

  public TenantDocuments getFile(Long id) {
    return tenantRepo.findById(id).get();
  }
  
  public Stream<TenantDocuments> getAllFiles(Long id) {
    return tenantRepo.findAll().stream();
  }

  public TenantDocuments getTenantDocumentsById(Long Id) {
        Optional < TenantDocuments > optional = tenantRepo.findById(Id);
        TenantDocuments documents = null;
        if (optional.isPresent()) {
            documents = optional.get();
        } else {
            throw new RuntimeException(" Document not found for id :: " + Id);
        }
        return documents;
    }

  
    public void deleteDocumentById(Long Id) {
        this.tenantRepo.deleteById(Id);
    }
 */
  
  
}