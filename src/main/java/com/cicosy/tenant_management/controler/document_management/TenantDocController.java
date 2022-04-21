/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.cicosy.tenant_management.controler.document_management;



import com.cicosy.tenant_management.model.document_management.TenantDocuments;

import com.cicosy.tenant_management.service.document_management.TenantDocumentsService;
import org.springframework.http.MediaType;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Dejong
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.util.*;
import com.cicosy.tenant_management.repository.document_management.TenantsDocumentRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(path="/api/tenant")
public class TenantDocController {

  @Autowired
  private TenantDocumentsService tenantdocumentsService;
  private static Logger log = LoggerFactory.getLogger(TenantDocController.class);
 

  @Autowired
  private TenantsDocumentRepo tenantRepo;


    @GetMapping("fetchfile/{id}")
    List<TenantDocuments> fetchfile(@PathVariable String id, HttpServletRequest request) {
        return tenantdocumentsService.findDoc(id);
    }



    @GetMapping("/downloadFile/{id}/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long id,@PathVariable String fileName,HttpServletRequest request) {
		// Load file as Resource
		Resource resource = tenantdocumentsService.loadFileAsResource(id,fileName);
		log.info("resource: " + resource);
		// Try to determine file's content type
		/*String contentType = null;
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
				.body(resource);*/
      String mimeType;

      try {
        mimeType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
      } catch (IOException e) {
        mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
      }
      mimeType = mimeType == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : mimeType;

      return ResponseEntity.ok()
              .contentType(MediaType.parseMediaType(mimeType))
//                .contentType(contentType)
              .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;fileName="+resource.getFilename())
              //.header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + resource.getFilename())
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
  @RequestParam("article_associ") MultipartFile file8, @RequestParam("company_profile") MultipartFile file9,
  @RequestParam("tenantID")  String tenantId,Long id) throws IOException{



  
    String application_letter = StringUtils.cleanPath(file0.getOriginalFilename());
    String cr14_form = StringUtils.cleanPath(file1.getOriginalFilename());
    String cr6_form = StringUtils.cleanPath(file2.getOriginalFilename());
    String director_id = StringUtils.cleanPath(file3.getOriginalFilename());
    String certificate_of_incorporation = StringUtils.cleanPath(file4.getOriginalFilename());
    String vat_reg = StringUtils.cleanPath(file5.getOriginalFilename());
    String bank_statement = StringUtils.cleanPath(file6.getOriginalFilename());
    String tax_clearance = StringUtils.cleanPath(file7.getOriginalFilename());
    String article_associ = StringUtils.cleanPath(file8.getOriginalFilename());
    String company_profile = StringUtils.cleanPath(file9.getOriginalFilename());


      if(application_letter.contains(" "))
    {
      application_letter= application_letter.replace(" ","_");
    }

    if(cr14_form.contains(" "))
    {
      cr14_form= cr14_form.replace(" ","_");
    }

      if(company_profile.contains(" "))
      {
          company_profile= company_profile.replace(" ","_");
      }
    if(cr6_form.contains(" "))
    {
      cr6_form= cr6_form.replace(" ","_");
    }

    if(director_id.contains(" "))
    {
      director_id= director_id.replace(" ","_");
    }
    if(certificate_of_incorporation.contains(" "))
    {
      certificate_of_incorporation= certificate_of_incorporation.replace(" ","_");
    }

    if(vat_reg.contains(" "))
    {
      vat_reg= vat_reg.replace(" ","_");
    }
    if(bank_statement.contains(" "))
    {
      bank_statement= bank_statement.replace(" ","_");
    }

    if(tax_clearance.contains(" "))
    {
      tax_clearance= tax_clearance.replace(" ","_");
    }

    if(article_associ.contains(" "))
    {
      article_associ= article_associ.replace(" ","_");
    }
    
    TenantDocuments documents= new TenantDocuments(tenantId);


    documents.setApplication_letter(application_letter);
    documents.setCr14(cr14_form);
    documents.setCr6(cr6_form);
    documents.setDirector(director_id);
    documents.setCertificate(certificate_of_incorporation);
    documents.setVat(vat_reg);
    documents.setBankStatement(bank_statement);
    documents.setTax(tax_clearance);
    documents.setArticle(article_associ);
    documents.setCompany_profile(company_profile);
    TenantDocuments docs = tenantRepo.save(documents);
    String uploadDir = System.getProperty("user.dir") + "assets/uploads/tenantDocuments" + docs.getId();

      tenantdocumentsService.store(tenantId,id,uploadDir, application_letter, file0);
      tenantdocumentsService.store(tenantId,id,uploadDir, cr14_form, file1);
      tenantdocumentsService.store(tenantId,id,uploadDir, cr6_form, file2);
      tenantdocumentsService.store(tenantId,id,uploadDir, director_id, file3);
      tenantdocumentsService.store(tenantId,id,uploadDir, certificate_of_incorporation,file4);
      tenantdocumentsService.store(tenantId,id,uploadDir, vat_reg, file5);
      tenantdocumentsService.store(tenantId,id,uploadDir, bank_statement, file6);
      tenantdocumentsService.store(tenantId,id,uploadDir, tax_clearance, file7);
      tenantdocumentsService.store(tenantId,id,uploadDir, article_associ, file8);
      tenantdocumentsService.store(tenantId,id,uploadDir, company_profile, file9);
      
	
   
  
     
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
