package com.cicosy.tenant_management.repository.maintenaceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import com.cicosy.tenant_management.model.maintenanceManagement.Schedule;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import java.util.List;

@Repository
public interface ScheduleRepo extends JpaRepository<Schedule,Long>{
    @Query("SELECT maintenance , schedule FROM MaintenanceRequests maintenance , Schedule  schedule where schedule.requestId=maintenance.id")
    List<Schedule> getAllSchedule();
}
