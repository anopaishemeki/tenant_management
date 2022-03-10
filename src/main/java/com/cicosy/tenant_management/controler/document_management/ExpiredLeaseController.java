package com.cicosy.tenant_management.controler.document_management;


import com.cicosy.tenant_management.model.document_management.ExpiredLeaseDocuments;
import com.cicosy.tenant_management.service.document_management.ExpiredLeaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfAction;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.IOException;
import java.io.OutputStream;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;




@RestController
@RequestMapping("/api/v1")
public class ExpiredLeaseController {

    @Autowired
    ExpiredLeaseService expiredLeaseService;

    ObjectMapper objectmapper = new ObjectMapper();
    @PostMapping("/expiredDocuments")
    public void SaveDetails(@RequestParam(required = true, value = "jsondata") String jsondata)throws JsonProcessingException, JsonMappingException{


        ExpiredLeaseDocuments expiredLeaseDocuments = objectmapper.readValue(jsondata, ExpiredLeaseDocuments.class);

        expiredLeaseDocuments.setToday(LocalDate.now());
        expiredLeaseService.storeDetails(expiredLeaseDocuments);
        
      
        
    }
    @GetMapping("/getexpiredlease/{id}")
    public ExpiredLeaseDocuments getDetails(@PathVariable Long id, HttpServletRequest request)throws Exception{
        return expiredLeaseService.getEx(id);
    }
    @RequestMapping("/getExpiredoc/{id}")
    public RestResponse singleDocument(@PathVariable Long id) {
        //instantiate the response object
        RestResponse response = new RestResponse();
         
        //set the employee to null
        ExpiredLeaseDocuments realldocuments = null;
         
        //grab all employees
        List<ExpiredLeaseDocuments> alldocuments = expiredLeaseService.getAllDocuments();
         
        //look for a match
        for (ExpiredLeaseDocuments expireddocuments : alldocuments) {
            if (expireddocuments.getId().equals(id)) {
                realldocuments = expireddocuments;
                break;
            }
        }
         
        if (realldocuments == null) {
            //the URL contains an unknown employee id - we'll return an empty response
            response.setResponseStatus(RestResponse.NOT_FOUND);
            response.setResponse("");
        } else {
            //good response if we get here
            response.setResponseStatus(RestResponse.OK);
            response.setResponse(realldocuments);
        }
         
        return response;
    }

 
    private static final SimpleDateFormat filenameDate = new SimpleDateFormat("ddMMyyyyHHmmss");
    private static final SimpleDateFormat readableDate = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

    @RequestMapping(value = "/export/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getExport(@PathVariable Long id) {
        
        ITextRenderer renderer = new ITextRenderer();
        ByteArrayOutputStream boas = null;
        try {
            String inputFile = "C:/Users/cicosy/Documents/tenant_management/src/main/resources/static/html/documentsManagement/expiredleasedocuments.html";
            String outputFile = "uploads"+filenameDate.format(new Date())+".pdf";

            String html = new String(Files.readAllBytes(Paths.get(inputFile)));
            final Document document = Jsoup.parse(html);
            document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
            document.body().select(".DOC_GENERATED_DATE").html(readableDate.format(new Date()));

            renderer.setDocumentFromString(document.html());
            renderer.layout();

            try (OutputStream os = Files.newOutputStream(Paths.get(outputFile))) {
                renderer.createPDF(os);
                os.close();

                PdfReader reader = new PdfReader(outputFile);
                boas = new ByteArrayOutputStream();
                PdfStamper stamper = new PdfStamper(reader, boas);
                stamper.setPageAction(PdfWriter.PAGE_OPEN, new PdfAction(PdfAction.PRINTDIALOG), 1); 
                stamper.close();
            } catch (DocumentException ex) {
                Logger.getLogger(ExpiredLeaseController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }   catch (IOException ex) {
            Logger.getLogger(ExpiredLeaseController.class.getName()).log(Level.SEVERE, null, ex);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(boas.toByteArray(), headers, HttpStatus.OK);
        return response;
    }
}





    
