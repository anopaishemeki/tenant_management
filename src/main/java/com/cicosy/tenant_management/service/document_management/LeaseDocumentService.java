package com.cicosy.tenant_management.service.document_management;

import com.cicosy.tenant_management.controler.document_management.exception.FileNotFoundException;
import com.cicosy.tenant_management.model.document_management.LeaseDocuments;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.repository.document_management.LeaseDocumentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
@Transactional	
public class LeaseDocumentService  {

	@Autowired
	LeaseDocumentsRepo leaseDocumentsRepo;

	
	public static String uploadDirectory = System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"lease";
	private final Path fileStorageLocation= Paths.get(uploadDirectory)
			.toAbsolutePath().normalize();
	
	public String saveFile(LeaseDocuments leaseDocuments) throws IOException {
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





	public LeaseDocuments store(MultipartFile file,String ID) throws IOException {
//		  String uploadDirectory = System.getProperty("user.dir") + "src/main/resources/static/assets/uploads/leaseDocuments";

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		String size = String.valueOf(file.getSize());
		String filePath = Paths.get(uploadDirectory, file.getOriginalFilename()).toString();



//		List<String> filesPath=new ArrayList<>();
		//String DocumentPath="src/main/resources/static/assets/uploads/";
		String DocumentPath=System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"Leases";
        File pathAsFile = new File(DocumentPath);

        if (!Files.exists(Paths.get(DocumentPath), new LinkOption[0])) {
           Files.createDirectories(Paths.get(DocumentPath));
        }
        if(fileName.contains(" "))
		{
			fileName= fileName.replace(" ","_");
		}

		byte[]  data =file.getBytes();
		Path path = Paths.get(DocumentPath+File.separator+fileName);
		Files.write(path,data, new LinkOption[0]);
//		filesPath.add(path.toString());


		LeaseDocuments leaseDocuments = new LeaseDocuments(
				fileName,filePath,size,file.getContentType(),ID);




		return leaseDocumentsRepo.save(leaseDocuments);
	}
	public List<LeaseDocuments> findfile(String id) {
		return leaseDocumentsRepo.findLeaseDocBySearch(id);
	}
	
}

