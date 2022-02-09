package com.cicosy.tenant_management.controler.leaseManagement;


import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.service.leaseManagement.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/lease")
public class LeaseController {

   private final LeaseService leaseService;

    @Autowired
    public LeaseController(LeaseService leaseService) {
        this.leaseService = leaseService;
    }

    @GetMapping(path="status/{Status}")
    public List<Lease> getExpiredLeases(@PathVariable String Status){
        return leaseService.getExpiredLeases(Status);
    }

    @GetMapping(path="getleases")
    public List<Lease> getLeases(){
        return leaseService.getLeases();
    }

    @PostMapping(path="addlease")
    public void registerNewLease(@RequestBody Lease lease){
        leaseService.addNewLease(lease);
    }

    @DeleteMapping(path ="deletelease/{leaseId}" )
    public void deleteLease(
            @PathVariable("leaseId") Long leaseId){
        leaseService.deleteLease(leaseId);
    }
    @PutMapping(path = "updatelease/{leaseId}")
    public void updateLease(@PathVariable Long leaseId, @RequestBody Lease lease){
        leaseService.updateLease(leaseId ,lease);


    }
    @PutMapping(path = "renewlease/{leaseId}")
    public void renewlease(@PathVariable Long leaseId, @RequestBody Lease renewal) {
        leaseService.renewlease(leaseId, renewal);
    }
}
