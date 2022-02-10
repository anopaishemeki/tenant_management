package com.cicosy.tenant_management.repository.maintenaceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.MaintenanceRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaintenanceRepo extends JpaRepository<MaintenanceRequests, Long> {

}
