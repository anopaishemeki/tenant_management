package com.cicosy.tenant_management.controler.leaseManagement;


import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import com.cicosy.tenant_management.service.leaseManagement.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/lease")
public class LeaseController {

    private final LeaseService leaseService;

    @Autowired
    public LeaseController(LeaseService leaseService) {
        this.leaseService = leaseService;
    }

    @GetMapping(path = "status/{Status}")
    public List<Lease> getExpiredLeases(@PathVariable String Status) {
        return leaseService.getExpiredLeases(Status);
    }


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


    @PostMapping(path = "addlease")
    public void registerNewLease(@RequestBody Lease lease, LeaseHistory leaseHistory) {

        leaseService.addNewLease(lease, leaseHistory);


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
