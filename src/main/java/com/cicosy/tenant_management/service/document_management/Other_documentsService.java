package com.cicosy.tenant_management.service.document_management;


import com.cicosy.tenant_management.model.document_management.Other_documents;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.repository.document_management.NoticeDocumentRepo;
import com.cicosy.tenant_management.repository.document_management.Other_documentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class Other_documentsService {

    @Autowired
    private Other_documentsRepo other_documentsRepo;



    public static String uploadDirectory = System.getProperty("user.dir")+"/assets/uploads/otherDocuments";
    private final Path fileStorageLocation= Paths.get(uploadDirectory)
            .toAbsolutePath().normalize();

    public String store(Other_documents other_documents) throws IOException {

        other_documentsRepo.save(other_documents);
        return "success";
    }

    public String getFormName( String ID) {
        return other_documentsRepo.findOtherForm(ID);
    }

    public List<Other_documents> getAll_OtherDocuments(Long id){

        return other_documentsRepo.findAll();
    }

    public String saveFile(Other_documents other_documents) throws IOException {

        other_documentsRepo.save(other_documents);
        return "success";
    }



    public void store(String document_name,String tenantId,Long id,String uploadDir,String fileName, MultipartFile multipartFile) throws IOException {
        // Path uploadPath = fileStorageLocation;
        int id1 = Integer.parseInt(tenantId);
        String uploadPath=System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"other_documents"+File.separator+"Tenant"+id1;
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
    public String getOth(String document_name,String tenantId){
        return other_documentsRepo.findOther(tenantId,document_name);
    }






}
