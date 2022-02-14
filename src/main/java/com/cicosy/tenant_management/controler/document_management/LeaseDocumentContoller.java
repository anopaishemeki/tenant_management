/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.message.document_management.Response;
import com.cicosy.tenant_management.message.document_management.ResponseMessage;
import com.cicosy.tenant_management.model.document_management.LeaseDocuments;


import com.cicosy.tenant_management.service.document_management.LeaseDocumentService;


import java.util.List;
import java.util.stream.Collectors;




/**
 *
 * @author Dejong
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;



@RestController
@RequestMapping("api/lease")
public class LeaseDocumentContoller {

  @Autowired
  private LeaseDocumentService leaseDocumentService;

  
  @PostMapping("/upoadleaseFiles")
  public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file)
      
    	 {
    String message = "";
    try {
      leaseDocumentService.store(file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
    }
  }

  @GetMapping("/getLeasedocuments")
  public ResponseEntity<List<Response>> getListFiles() {
    List<Response> files = leaseDocumentService.getAllFiles().map(dbFile -> {
      String fileDownloadUri = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/files/")
          .path(dbFile.getId())
          .toUriString();

      return new Response(
          dbFile.getName(),
          fileDownloadUri,
          dbFile.getType(),
          dbFile.getData().length);
    }).collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping("/getfiles/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
    LeaseDocuments leaseDocuments = leaseDocumentService.getFile(id);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + leaseDocuments.getName() + "\"")
        .body(leaseDocuments.getData());
  }




    @GetMapping("/leaseupdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") String id, Model model) {

        // get employee from the service
        LeaseDocuments leaseDocuments = leaseDocumentService.getLeaseDocumentsById(id);

        // set employee as a model attribute to pre-populate the form
        model.addAttribute("leaseDocuments", leaseDocuments);
        return "update_documents";
    }

    @GetMapping("/deleteleasedocuments/{id}")
    public String deleteLease(@PathVariable(value = "id") String id) {

        // call delete employee method 
        this.leaseDocumentService.deleteDocumentById(id);
        return "redirect:/";
    }
  
 
   

}