package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.model.document_management.Other_documents;
import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.service.document_management.Other_documentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("other")
public class Other_DocumentsControler {

    @Autowired
    private Other_documentsService other_documentsService;


    @PostMapping("/upload_other")

    public String uploadFile(@RequestParam("other") MultipartFile file,

                             @RequestParam("tenantID")  String tenantId,
                             @RequestParam("document_name")String document_name
                            ,Long id) throws IOException {





        String filename = StringUtils.cleanPath(file.getOriginalFilename());


        if(filename.contains(" "))
        {
            filename= filename.replace(" ","_");
        }


        Other_documents documents= new Other_documents();


        documents.setDocument(filename);
        documents.setTenantId(tenantId);
        documents.setDocument_name(document_name);

        String uploadDir = System.getProperty("user.dir") + "assets/uploads/tenantDocuments" ;

        other_documentsService.store(tenantId,id,uploadDir, filename, file,document_name);




        return "success";
    }
}
