package com.cicosy.tenant_management.service.maintenanceManagement;


import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.model.maintenanceManagement.Schedule;
import com.cicosy.tenant_management.repository.maintenaceManagement.ScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    ScheduleRepo scheduleRepo;
    public void addSchedule(Schedule schedule, Long id) {

        scheduleRepo.save(schedule);
    }
    public List<Schedule> getAllSchedule(){
        return scheduleRepo.findAll();
    }
}
