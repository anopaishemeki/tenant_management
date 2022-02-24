/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.controler.document_management.message.Response;
import com.cicosy.tenant_management.controler.document_management.message.ResponseMessage;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;

import com.cicosy.tenant_management.service.document_management.TenantDocumentsService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.MediaType;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Dejong
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.ui.Model;
import java.io.*;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.util.*;
import com.cicosy.tenant_management.repository.document_management.TenantsDocumentRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;



@RestController
@RequestMapping(path="/api/tenant")
public class TenantDocController {

  @Autowired
  private TenantDocumentsService tenantdocumentsService;
  private static Logger log = LoggerFactory.getLogger(TenantDocController.class);
  @Autowired
  private TenantsDocumentRepo tenantRepo;

  @GetMapping("/downloadFile/{id}/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long id,@PathVariable String fileName,HttpServletRequest request) {
		// Load file as Resource
		Resource resource = tenantdocumentsService.loadFileAsResource(id,fileName);
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

  @PostMapping("/uploadtenantDocument")
  
  public String uploadFile(@RequestParam("application_letter") MultipartFile file0,
  @RequestParam("cr14_form") MultipartFile file1,
  @RequestParam("cr6_form") MultipartFile file2,
  @RequestParam("certificate_of_inco") MultipartFile file3
  ,@RequestParam("director_id") MultipartFile file4,
  @RequestParam("bank_statement") MultipartFile file5,
  @RequestParam("vat_reg") MultipartFile file6,
  @RequestParam("tax_clearance") MultipartFile file7,
  @RequestParam("article_associ") MultipartFile file8,Long id) throws IOException{ 

  
    String application_letter = StringUtils.cleanPath(file0.getOriginalFilename());
    String cr14_form = StringUtils.cleanPath(file1.getOriginalFilename());
    String cr6_form = StringUtils.cleanPath(file2.getOriginalFilename());
    String director_id = StringUtils.cleanPath(file3.getOriginalFilename());
    String certificate_of_incorporation = StringUtils.cleanPath(file4.getOriginalFilename());
    String vat_reg = StringUtils.cleanPath(file5.getOriginalFilename());
    String bank_statement = StringUtils.cleanPath(file6.getOriginalFilename());
    String tax_clearance = StringUtils.cleanPath(file7.getOriginalFilename());
    String article_associ = StringUtils.cleanPath(file8.getOriginalFilename());
   
   
    TenantDocuments documents= new TenantDocuments(application_letter);
    
    documents.setCr14(cr14_form);
    documents.setCr6(cr6_form);
    documents.setDirector(director_id);
    documents.setCertificate(certificate_of_incorporation);
    documents.setVat(vat_reg);
    documents.setBankStatement(bank_statement);
    documents.setTax(tax_clearance);
    documents.setArticle(article_associ);

    TenantDocuments docs = tenantRepo.save(documents);
    String uploadDir = "tenantDocuments/" + docs.getId();
  
    

      
      tenantdocumentsService.store(id,uploadDir, application_letter, file0);
      tenantdocumentsService.store(id,uploadDir, cr14_form, file1);
      tenantdocumentsService.store(id,uploadDir, cr6_form, file2);
      tenantdocumentsService.store(id,uploadDir, director_id, file3);
      tenantdocumentsService.store(id,uploadDir, certificate_of_incorporation,file4);
      tenantdocumentsService.store(id,uploadDir, vat_reg, file5);
      tenantdocumentsService.store(id,uploadDir, bank_statement, file6);
      tenantdocumentsService.store(id,uploadDir, tax_clearance, file7);
      tenantdocumentsService.store(id,uploadDir, article_associ, file8);
      
	
   
  
     
      return "success";
  }
}




 /**  @RequestMapping(method = RequestMethod.POST, headers = "action=delete-bill-by-id")
  public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file1") MultipartFile file) {
    String message = "";
    try {
      tenantdocumentsService.store1(file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
    }
  }
  @RequestMapping(method = RequestMethod.POST, headers = "action=delete-bill-by-id")
  @ResponseStatus(code = HttpStatus.NO_CONTENT)

  public ResponseEntity<ResponseMessage> uploadFile2(@RequestParam("file2") MultipartFile file) {
    String message = "";
    try {
      tenantdocumentsService.store1(file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
    }
  }


  



    @GetMapping("/deletedocuments/{id}")
    public String deleteTenant(@PathVariable(value = "id") Long Id) {

      
        this.tenantdocumentsService.deleteDocumentById(Id);
        return "redirect:/";
    }
  
  
}*/
