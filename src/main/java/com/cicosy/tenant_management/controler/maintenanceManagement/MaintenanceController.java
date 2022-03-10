package com.cicosy.tenant_management.controler.maintenanceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.AttendedRequest;
import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.service.maintenanceManagement.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/maintenance")
public class MaintenanceController {
    @Autowired
    private MaintenanceService maintenanceService;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @RequestMapping("getAll")
    public List<MaintenanceRequests> getAllMaintenanceRequests() {
        return maintenanceService.getAllMaintenanceRequests();

    }
    @RequestMapping("getAllScheduled")
    public List<MaintenanceRequests> getAllScheduled() {
        return maintenanceService.getScheduled();

    }


    // get maintenance  by id rest api
    @GetMapping("/{id}")
    public MaintenanceRequests getMaintenanceRequestsById(@PathVariable Long id) throws Exception {
       return maintenanceService.getMaintenanceRequestsById(id);
    }

    @GetMapping(path = "/status/{status}")
    public List<MaintenanceRequests> getMaintenanceRequestsByStatus(@PathVariable String status) {
        return maintenanceService.overdueRequest(status);
    }

    @PostMapping
    public void addStudent( @RequestBody MaintenanceRequests maintenanceRequest) {
        maintenanceService.addMaintenanceRequest(maintenanceRequest);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody MaintenanceRequests requestDetails) throws Exception {
        maintenanceService.updateMaintenanceRequest(id, requestDetails);
    }

    @PutMapping("/{id}/schedule")
    public void addSchedule(@PathVariable Long id, @RequestBody MaintenanceRequests scheduleDetails) throws Exception {
        maintenanceService.addSchedule(id, scheduleDetails);
    }

    @DeleteMapping("/attended/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRequest(@PathVariable Long id , AttendedRequest attendedRequestDetails){
        return maintenanceService.deleteRequest(id,attendedRequestDetails);
    }
}
