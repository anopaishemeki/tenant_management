package com.cicosy.tenant_management.controler.maintenanceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.AttendedRequest;
import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.service.maintenanceManagement.AttendedRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/maintenance")
public class AttendedRequestController {

    @Autowired
    AttendedRequestService attendedRequestService;

    @PostMapping("/attended")
    public void attendedRequest(@RequestBody AttendedRequest attendedRequestDetails){
        attendedRequestService.addAttended(attendedRequestDetails);
    }
    @RequestMapping("getAllAttended")
    public List<AttendedRequest> getAllAttended() {
        return attendedRequestService.getAttend();

    }

}
