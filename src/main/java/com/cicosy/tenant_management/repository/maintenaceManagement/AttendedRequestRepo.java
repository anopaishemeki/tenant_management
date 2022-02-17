package com.cicosy.tenant_management.repository.maintenaceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.AttendedRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendedRequestRepo  extends JpaRepository<AttendedRequest, Long> {
}
