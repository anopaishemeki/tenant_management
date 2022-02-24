/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.controler.document_management.message.Response;
import com.cicosy.tenant_management.controler.document_management.message.ResponseMessage;
import com.cicosy.tenant_management.model.document_management.NoticeDocuments;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.service.document_management.NoticeDocumentsService;

import com.cicosy.tenant_management.service.document_management.TenantDocumentsService;
import java.util.List;
import java.util.stream.Collectors;




/**
 *
 * @author Dejong
 */
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import javax.servlet.http.HttpServletRequest;
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
@RequestMapping("/file-upload")
public class NoticeDocController {

	private static Logger log = LoggerFactory.getLogger(NoticeDocController.class);
	public static String uploadDirectory = System.getProperty("user.dir") + "/uploads/noticedocuments";

	@Autowired
	NoticeDocumentsService noticeDocumentsService;
  
  



	@PostMapping("/uploadNotice")
	public @ResponseBody ResponseEntity<?> createFile(NoticeDocuments noticeDocuments,
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
			noticeDocuments.setFileName(fileName);
			noticeDocuments.setFilePath(filePath);
			noticeDocuments.setFileType(fileType);
			noticeDocuments.setFileSize(fileSize);
			

			String status = noticeDocumentsService.saveFile(noticeDocuments);
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

	@GetMapping("/downloadNoticeFile/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = noticeDocumentsService.loadFileAsResource(fileName);
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




}
