/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.service.document_management;




import com.cicosy.tenant_management.model.document_management.LeaseDocuments;
import com.cicosy.tenant_management.model.document_management.NoticeDocuments;
import com.cicosy.tenant_management.repository.document_management.NoticeDocumentRepo;

import java.io.File;
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
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;


import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


@Service
@Transactional	
public class NoticeDocumentsService  {

	@Autowired
	NoticeDocumentRepo noticeDocumentRepo;


	public static String uploadDirectory = System.getProperty("user.dir")+File.separator+"assets"+File.separator+"uploads"+File.separator+"other_doc";
	private final Path fileStorageLocation= Paths.get(uploadDirectory)
			.toAbsolutePath().normalize();

	public NoticeDocuments store(MultipartFile file, String ID) throws IOException {
//		  String uploadDirectory = System.getProperty("user.dir") + "src/main/resources/static/assets/uploads/leaseDocuments";

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

//		List<String> filesPath=new ArrayList<>();
		//String DocumentPath="src/main/resources/static/assets/uploads/";
		String DocumentPath=System.getProperty("user.dir")+File.separator+"uploads"+File.separator+"other_doc";
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


		NoticeDocuments noticeDocuments = new NoticeDocuments(
				fileName,ID);




		return noticeDocumentRepo.save(noticeDocuments);
	}



}

