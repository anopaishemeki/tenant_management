package com.cicosy.tenant_management.controler.maintenanceManagement;


import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.model.maintenanceManagement.Schedule;
import com.cicosy.tenant_management.service.maintenanceManagement.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/maintenance")
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @PostMapping("/{id}/schedule")
    public void addSchedule(@PathVariable Long id, @RequestBody Schedule schedule) {

        scheduleService.addSchedule(schedule,id);
    }
    @RequestMapping("getAllSchedule")
    public List<Schedule> getAllMaintenanceRequests() {
        return scheduleService.getAllSchedule();

    }
}
