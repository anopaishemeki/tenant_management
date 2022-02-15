package com.cicosy.tenant_management.repository.tenantManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
    Tenant getByName(String name);
    //This code is here broooo iweeeeeee
   // Lazarous code irikuita iyi
}
