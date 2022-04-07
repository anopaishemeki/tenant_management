/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.cicosy.tenant_management.controler.document_management;



import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;


import javax.servlet.http.HttpServletRequest;

import com.cicosy.tenant_management.model.document_management.LeaseDocuments;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.service.document_management.LeaseDocumentService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;




@Controller
@RequestMapping("/api/v1")
public class LeaseDocumentContoller {

	private static Logger log = LoggerFactory.getLogger(LeaseDocumentContoller.class);
	public static String uploadDirectory = System.getProperty("user.dir") + File.separator+"uploads"+File.separator+"TenantDocuments";

	@Autowired
	LeaseDocumentService leaseDocumentService;
  
  



	@PostMapping("/upload")
	public @ResponseBody ResponseEntity<?> createFile(LeaseDocuments leaseDocuments,
			 final @RequestParam("file") MultipartFile file) {
		try {
		
			String fileName = file.getOriginalFilename();
			String filePath = Paths.get(uploadDirectory, fileName).toString();
			String fileType = file.getContentType();
			long size = file.getSize();
			String fileSize = String.valueOf(size);
			

		
			log.info("FileName: " + file.getOriginalFilename());
			log.info("FileType: " + file.getContentType());
			log.info("FileSize: " + file.getSize());

			// Save the file locally
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
			stream.write(file.getBytes());
			stream.close();

	;
			leaseDocuments.setFileName(fileName);
			leaseDocuments.setFilePath(filePath);
			leaseDocuments.setFileType(fileType);
			leaseDocuments.setFileSize(fileSize);
			

			String status = leaseDocumentService.saveFile(leaseDocuments);
			if (status.equals("success")) {
				log.info("HttpStatus===" + new ResponseEntity<>(HttpStatus.OK));
				return new ResponseEntity<>(" File Saved - " + fileName, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.info("Exception: " + e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/downloadFile/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = leaseDocumentService.loadFileAsResource(fileName);
		log.info("resource: " + resource);
		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
			log.info("contentType: " + contentType);
		} catch (IOException ex) {
			log.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	@GetMapping("fetchleasefile/{id}")
	List<LeaseDocuments> fetchfile(@PathVariable String id, HttpServletRequest request) {
		return leaseDocumentService.findfile(id);
	}




}
