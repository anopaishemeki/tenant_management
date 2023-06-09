package com.cicosy.tenant_management.service.maintenanceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.AttendedRequest;
import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.model.maintenanceManagement.Schedule;
import com.cicosy.tenant_management.repository.maintenaceManagement.AttendedRequestRepo;
import com.cicosy.tenant_management.repository.maintenaceManagement.MaintenanceRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class MaintenanceService {

    @Autowired
    private MaintenanceRepo maintenanceRepo;

    @Autowired
    private AttendedRequestRepo attendedRequestRepo;



    public void setStatus() {
        List<MaintenanceRequests> maintenanceRequest = maintenanceRepo.findAll();

        for (int i = 0; i < maintenanceRepo.findAll().size(); i++) {
            Long maintenanceRequestId = maintenanceRequest.get(i).getId();
            MaintenanceRequests maintenanceRequests = maintenanceRepo.findById(maintenanceRequestId)
                    .orElseThrow(() -> new IllegalStateException("Request with Id" + maintenanceRequestId + "does not exist"));

            if (maintenanceRequests.getOverdueDate().isBefore(LocalDate.now())) {
                maintenanceRequests.setStatus("Overdue");
            } else {
                maintenanceRequests.setStatus("Pending");
            }



        }

    }


    @Transactional
    public List<MaintenanceRequests> getAllMaintenanceRequests() {
        setStatus();

        return maintenanceRepo.findAll();
    }

    public List<MaintenanceRequests> getScheduled(){
        setStatus();
        return maintenanceRepo.findByScheduleNotNull();
    }




    public MaintenanceRequests getMaintenanceRequestsById(long Id) throws Exception {
        return maintenanceRepo.findById(Id).orElseThrow(() -> new Exception("MaintenanceRequest is not found"));


    }

    @Transactional
    public List<MaintenanceRequests> overdueRequest(String status) {
        setStatus();
        return maintenanceRepo.getMaintenanceRequestsByStatus(status);
    }

    public void addMaintenanceRequest(MaintenanceRequests maintenanceRequest) {

        maintenanceRepo.save(maintenanceRequest);
    }


    public void updateMaintenanceRequest(Long id, MaintenanceRequests requestDetails) throws Exception {
        MaintenanceRequests maintenanceRequest = maintenanceRepo.findById(id)
                .orElseThrow(() -> new Exception("Employee with id :" + id+" does not exist"));

        maintenanceRequest.setRequest(requestDetails.getRequest());
        maintenanceRequest.setDateLogged(requestDetails.getDateLogged());
        maintenanceRequest.setLevelOfUrgency(requestDetails.getLevelOfUrgency());
        maintenanceRequest.setDescription(requestDetails.getDescription());
        maintenanceRequest.setStatus(requestDetails.getStatus());


        MaintenanceRequests updatedMaintenanceRequest = maintenanceRepo.save(maintenanceRequest);

    }

    public void addSchedule(Long id, MaintenanceRequests scheduleDetails) throws Exception {
        MaintenanceRequests maintenanceRequest = maintenanceRepo.findById(id)
                .orElseThrow(() -> new Exception("Employee not exist with id :" + id));



        maintenanceRequest.setSchedule(scheduleDetails.getSchedule());


        maintenanceRepo.save(maintenanceRequest);

    }

    public ResponseEntity<Map<String, Boolean>> deleteRequest(@PathVariable Long id ,AttendedRequest attendedRequestDetails) {
        AttendedRequest attendedRequest = new AttendedRequest();
        attendedRequest.setRequest(attendedRequestDetails.getRequest());
        attendedRequest.setDescription(attendedRequestDetails.getDescription());
        attendedRequest.setDateLogged(attendedRequestDetails.getDateLogged());

        maintenanceRepo.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        return ResponseEntity.ok(response);


    }
}


