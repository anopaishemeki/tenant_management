package com.cicosy.tenant_management.controler.leaseManagement;


import com.cicosy.tenant_management.controler.document_management.message.ResponseMessage;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import com.cicosy.tenant_management.service.document_management.LeaseDocumentService;
import com.cicosy.tenant_management.service.leaseManagement.LeaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/lease")
public class LeaseController {

    private final LeaseService leaseService;
    private final LeaseDocumentService leaseDocumentService;

    @Autowired
    public LeaseController(LeaseService leaseService, LeaseDocumentService leaseDocumentService) {
        this.leaseService = leaseService;
        this.leaseDocumentService = leaseDocumentService;
    }

//    @GetMapping(path = "home")
//    public List<Lease> getExpiredLeases(@PathVariable String Status) {
//        return leaseService.getExpiredLeases(Status);
//    }



    @GetMapping(path = "notice/{time}")
    public List<Lease> getAboutToExpire(@PathVariable int time) {
        return leaseService.getAboutToExpire(time);
    }

    @GetMapping(path = "getleases")
    public List<Lease> getLeases() {
        return leaseService.getLeases();
    }

    @GetMapping(path = "getleasesHistory")
    public List<LeaseHistory> getLeaseHistory() {
        return leaseService.getLeaseHistory();
    }



    ObjectMapper objectmapper= new ObjectMapper();

    @RequestMapping(path = "addlease",method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  ResponseEntity<Object> registerNewLease(
            @RequestParam(required = true, value = "jsondata") String jsondata,
            LeaseHistory leaseHistory,
            @RequestParam(required = true, value="file") MultipartFile file) throws IOException {


        Lease lease = objectmapper.readValue(jsondata,Lease.class);

        leaseService.addNewLease(lease, leaseHistory);




        String message = "";
        try {

            leaseDocumentService.store(file);

            message = "Record Saved with Agreement file successfully : " + file.getOriginalFilename();

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }

    }

//    @DeleteMapping(path = "deletelease/{leaseId}")
//    public void deleteLease(@PathVariable("leaseId") Long leaseId, LeaseHistory leaseHistory) {
//        leaseService.SaveDelete(leaseId, leaseHistory);
//        leaseService.deleteLease(leaseId);
//
//    }

    @PutMapping(path = "updatelease/{leaseId}")
    public void updateLease(@PathVariable Long leaseId,
                            @RequestBody Lease lease,
                            LeaseHistory leaseHistory,
                            String Status
    ) {
        Status="Updated";
        leaseService.updateLease(leaseId, lease);

        leaseService.SaveToHistory(leaseId, leaseHistory,Status);


    }

    @PutMapping(path = "terminatelease/{leaseId}")
    public void terminatelease(@PathVariable Long leaseId,
                            @RequestBody Lease lease,
                            LeaseHistory leaseHistory,
                               String Status
    ) {
        Status="Terminated";
        leaseService.terminatelease(leaseId, lease);

        leaseService.SaveToHistory(leaseId, leaseHistory,Status);


    }


    @PutMapping(path = "renewlease/{leaseId}")
    public void renewlease(@PathVariable Long leaseId, @RequestBody Lease renewal, LeaseHistory leaseHistory ,String status) {

        status ="Renewed";
        leaseService.renewlease(leaseId, renewal);

        leaseService.SaveToHistory(leaseId, leaseHistory,status);
    }
}
