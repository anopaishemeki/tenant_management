/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.message.document_management.Response;
import com.cicosy.tenant_management.message.document_management.ResponseMessage;
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
@RequestMapping(path="/api/tenant")
public class NoticeDocController {

  @Autowired
  private NoticeDocumentsService noticedocumentService;

  @PostMapping("/uploadNotice")
  
  public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      noticedocumentService.store(file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
    }
  }

  @GetMapping("/getnoticedoc")
  public ResponseEntity<List<Response>> getListFiles() {
    List<Response> files = noticedocumentService.getAllFiles().map(dbFile -> {
      String fileDownloadUri = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/files/")
          .path(dbFile.getId().toString())
          .toUriString();

      return new Response(
          dbFile.getName(),
          fileDownloadUri,
          dbFile.getType(),
          dbFile.getData().length);
    }).collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping("/getnoticefiles/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
    NoticeDocuments documents = noticedocumentService.getFile(id);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + documents.getName() + "\"")
        .body(documents.getData());
  }


  
    @GetMapping("/updatenotice/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") Long Id, Model model) {

        // get employee from the service
        NoticeDocuments noticeDocuments = noticedocumentService.getNoticeDocumentsById(Id);

        // set employee as a model attribute to pre-populate the form
        model.addAttribute("noticeDocuments", noticeDocuments);
        return "update_noticedocuments";
    }

    @GetMapping("/deleteoticedocuments/{id}")
    public String deleteNotice(@PathVariable(value = "id") Long Id) {

        // call delete employee method 
        this.noticedocumentService.deleteDocumentById(Id);
        return "redirect:/";
    }
  
  
}