package com.cicosy.tenant_management.service.maintenanceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.repository.maintenaceManagement.MaintenanceRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class MaintenanceService {

    @Autowired
    public MaintenanceRepo maintenanceRepo;



    public List<MaintenanceRequests> getAllMaintenanceRequests(){
        return maintenanceRepo.findAll();
    }



    public MaintenanceRequests getMaintenanceRequestsById(long Id) throws Exception {
        return maintenanceRepo.findById(Id).orElseThrow(() ->new Exception("MaintenanceRequest is not found"));


        
}
        @Transactional
        public List<MaintenanceRequests> overdueRequest(String status)  {
            List<MaintenanceRequests> maintenanceRequest = maintenanceRepo.findAll();

            for(int i=0; i< maintenanceRepo.findAll().size();i++) {
                Long maintenanceRequestId = maintenanceRequest.get(i).getId();
                MaintenanceRequests maintenanceRequests = maintenanceRepo.findById(maintenanceRequestId)
                        .orElseThrow(()-> new IllegalStateException("Request with Id"+maintenanceRequestId+"does not exist"));

                if(maintenanceRequests.getOverdueDate().isBefore(LocalDate.now())){
                    maintenanceRequests.setStatus("Overdue");
                }else {
                    maintenanceRequests.setStatus("Pending");
                }
            }

        return maintenanceRepo.getMaintenanceRequestsByStatus(status);
        }

        public void addMaintenanceRequest(MaintenanceRequests maintenanceRequest) {

            maintenanceRepo.save(maintenanceRequest);
        }



    public void updateMaintenanceRequest( Long id, MaintenanceRequests requestDetails)throws Exception{
        MaintenanceRequests maintenanceRequest = maintenanceRepo.findById(id)
                .orElseThrow(() -> new Exception("Employee not exist with id :" + id));

        maintenanceRequest.setRequest(requestDetails.getRequest());
        maintenanceRequest.setDateLogged(requestDetails.getDateLogged());
        maintenanceRequest.setLevelOfUrgency(requestDetails.getLevelOfUrgency());
        maintenanceRequest.setDescription(requestDetails.getDescription());
        maintenanceRequest.setStatus(requestDetails.getStatus());


        MaintenanceRequests updatedMaintenanceRequest = maintenanceRepo.save(maintenanceRequest);

    }
    public void addSchedule( Long id, MaintenanceRequests scheduleDetails)throws Exception{
        MaintenanceRequests maintenanceRequest = maintenanceRepo.findById(id)
                .orElseThrow(() -> new Exception("Employee not exist with id :" + id));

        maintenanceRequest.setRequest(scheduleDetails.getRequest());
        maintenanceRequest.setDateLogged(scheduleDetails.getDateLogged());
        maintenanceRequest.setLevelOfUrgency(scheduleDetails.getLevelOfUrgency());
        maintenanceRequest.setDescription(scheduleDetails.getDescription());
        maintenanceRequest.setMaintenanceDate(scheduleDetails.getMaintenanceDate());


         MaintenanceRequests addSchedule = maintenanceRepo.save(maintenanceRequest);

    }

}


