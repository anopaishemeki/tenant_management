package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.controler.document_management.message.ResponseMessage;
import com.cicosy.tenant_management.model.document_management.Other_documents;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import com.cicosy.tenant_management.repository.document_management.Other_documentsRepo;
import com.cicosy.tenant_management.service.document_management.NoticeDocumentsService;
import com.cicosy.tenant_management.service.document_management.Other_documentsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class Other_DocumentsControler {

    @Autowired
    private Other_documentsService other_documentsService;

    @Autowired
    private NoticeDocumentsService noticeDocumentsService;

    @Autowired
    private Other_documentsRepo other_documentsRepo;


//    ObjectMapper objectmapper = new ObjectMapper();
//
//    @RequestMapping(path = "/{id}/add_other", method = RequestMethod.POST,
//            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Object> addnewdoc(
//            @RequestParam(required = true, value = "jsondata") String jsondata,
//            @RequestParam(required = true, value = "file") MultipartFile file ,@PathVariable Long id) throws IOException {
//
//
//        Other_documents other_documents = objectmapper.readValue(jsondata, Other_documents.class);
//
//        other_documentsService.store(other_documents);
//        String ID=other_documents.getId().toString();
//
//
//        String message = "";
//
//
//
//        try {
//
//            noticeDocumentsService.store(file,ID);
//
//
//            message = "details : " + file.getOriginalFilename();
//
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//        } catch (Exception e) {
//            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//        }
//
//    }

    @GetMapping(path="/getAll_other/{id}")
    public List<Other_documents> getAll(@PathVariable String id){
       return  other_documentsService.getAll_OtherDocuments(id);
    }


    @PostMapping("/uploadOther/{id}")

    public String uploadFile(@RequestParam("file") MultipartFile file0,
                             @RequestParam("document_name") String document_name,
                             @RequestParam("tenantId") @PathVariable String tenantId,Long id) throws IOException{




        String otherF = StringUtils.cleanPath(file0.getOriginalFilename());


        if(otherF.contains(" "))
        {
            otherF= otherF.replace(" ","_");
        }

        document_name = document_name.replaceAll("^\"|\"$", "");



        Other_documents documents= new Other_documents();


        documents.setDocument_name(document_name);
        documents.setOtherFile(otherF);
        documents.setTenantId(tenantId);

        Other_documents docs = other_documentsRepo.save(documents);
        String uploadDir = System.getProperty("user.dir") + "assets/uploads/other_documents/Tenant" + docs.getId();

        other_documentsService.store(document_name,tenantId,id,uploadDir, otherF, file0);




        return "success";
    }

    @GetMapping("/getoth/{tenantId}/{document_name}")
    public String getForm(@PathVariable String tenantId,@PathVariable String document_name){

        return other_documentsService.getOth(tenantId,document_name);
    }

}
