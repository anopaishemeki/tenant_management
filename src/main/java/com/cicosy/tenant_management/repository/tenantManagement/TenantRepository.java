package com.cicosy.tenant_management.repository.tenantManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    Tenant getByName(String name);
    //This code is here broooo iweeeeeee
   // Lazarous code irikuita iyi




 }