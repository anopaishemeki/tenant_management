package com.cicosy.tenant_management.controler.leaseManagement;


import com.cicosy.tenant_management.controler.document_management.message.ResponseMessage;
import com.cicosy.tenant_management.controler.propertyManagement.CompartmentController2;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import com.cicosy.tenant_management.security.models.User;
import com.cicosy.tenant_management.security.repositories.UserRepository;
import com.cicosy.tenant_management.service.document_management.LeaseDocumentService;
import com.cicosy.tenant_management.service.leaseManagement.LeaseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(path = "api/v1/lease")
public class LeaseController {

    private final LeaseService leaseService;
    private final LeaseDocumentService leaseDocumentService;
    private CompartmentController2 compartmentController;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public LeaseController(LeaseService leaseService, LeaseDocumentService leaseDocumentService, CompartmentController2 compartmentController) {
        this.leaseService = leaseService;
        this.leaseDocumentService = leaseDocumentService;
        this.compartmentController = compartmentController;
    }

    @Autowired
    private UserRepository userRepository;




    @GetMapping(path = "notice/{time}")
    public List<Lease> getAboutToExpire(@PathVariable int time) {
        return leaseService.getAboutToExpire(time);
    }
    @GetMapping(path = "search/{record}")
    public List<Lease> getLeaseBySearch(@PathVariable String record) {
        return leaseService.getLeaseBySearch(record);
    }
    @GetMapping(path = "getleases")
    public List<Lease> getLeases() {


        return leaseService.getLeases();
    }

    @GetMapping(path = "getleasesHistory")
    public List<LeaseHistory> getLeaseHistory() {
        return leaseService.getLeaseHistory();
    }


    @GetMapping(path = "getform/{ID}")
    public String getFormName(@PathVariable String ID) {
        return leaseService.getFormName(ID);

    }
    @GetMapping(path="home")
    public String home(){
        return System.getProperty("user.home");
    }


    //@GetMapping(path = "tenant/{ID}")
    public List<Lease> getLeaseByT_ID(@PathVariable String ID) {
        return leaseService.getLeaseByT_ID(ID);
    }

    @GetMapping("/load/{fileName}")
   public ResponseEntity<Object> LoadFile(@PathVariable String fileName, HttpServletRequest request) {

        Resource resource = leaseService.downloadFile(fileName);

        return ResponseEntity.ok()
                .body(new ResponseMessage(resource.toString()));

    }

    @GetMapping("/download/{fileName}")
    ResponseEntity<Resource> downLoadSingleFile(@PathVariable String fileName, HttpServletRequest request) {

        Resource resource = leaseService.downloadFile(fileName);

        MediaType contentType = MediaType.APPLICATION_PDF;

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



    ObjectMapper objectmapper = new ObjectMapper();

    @RequestMapping(path = "addlease", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> registerNewLease(
            @RequestParam(required = true, value = "jsondata") String jsondata,
            LeaseHistory leaseHistory,
            @RequestParam(required = true, value = "file") MultipartFile file) throws IOException {


        Lease lease = objectmapper.readValue(jsondata, Lease.class);

        leaseService.addNewLease(lease, leaseHistory);
        String ID=lease.getId().toString();


        String message = "";


        try {

            leaseDocumentService.store(file,ID);


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
    @GetMapping(path = "getLease/{leaseId}")
    public Lease getLease(@PathVariable Long leaseId) {

        Lease lease= leaseService.findLeaseById(leaseId);

            lease.setTenant(compartmentController.getTenantForSpecificLease(lease.getTenant_id()));


        return lease;

    }

    @GetMapping(path = "getEmail/{name}/")
    public String getEmail(@PathVariable String name) {
        return leaseService.findTenantEmail(name);

    }

    @PutMapping(path = "updatelease/{leaseId}")
    public void updateLease(@PathVariable Long leaseId,
                            @RequestBody Lease lease,
                            LeaseHistory leaseHistory,
                            String Status
    ) {
        Status = "Updated";
        leaseService.updateLease(leaseId, lease);

        leaseService.SaveToHistory(leaseId, leaseHistory, Status);


    }

    @PutMapping(path = "terminatelease/{leaseId}")
    public void terminatelease(@PathVariable Long leaseId,
                               @RequestBody Lease lease,
                               LeaseHistory leaseHistory,
                               String Status
    ) {
        Status = "Terminated";
        leaseService.terminatelease(leaseId, lease);

        leaseService.SaveToHistory(leaseId, leaseHistory, Status);


    }

    @GetMapping(path = "renewed")
    public List<LeaseHistory> getExpired(LeaseHistory leaseHistory) {
        return leaseService.getRenewed();
    }


    @PutMapping(path = "renewlease/{leaseId}")
    public void renewlease(@PathVariable Long leaseId, @RequestBody Lease renewal, LeaseHistory leaseHistory, String status) {

        status = "Renewed";
        leaseService.renewlease(leaseId, renewal);

        leaseService.SaveToHistory(leaseId, leaseHistory, status);
    }


   @GetMapping("/getUser/{user}")
    public User getUser(@PathVariable String user){


       User systemUser =userRepository.findByUsername(user);

        return systemUser;
   }

    @PostMapping("/comparePass/{username}")
    public void ComparePass(@PathVariable String username,@RequestBody User user){

        User systemUser =userRepository.findByUsername(username);
        if(systemUser==null){
            throw new IllegalStateException("Username not found");
        }else{
            if(passwordEncoder.matches(user.getPassword(),systemUser.getPassword())){
                System.out.println("Password matches");
                systemUser.setPassword(passwordEncoder.encode(user.getNewPass()));
                userRepository.save(systemUser);
                System.out.println("Password Changed");
            }else{
                throw new IllegalStateException("Password mismatch");
            }
        }


    }

}
