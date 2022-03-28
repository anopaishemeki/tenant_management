package com.cicosy.tenant_management.repository.accounting;

import com.cicosy.tenant_management.model.accounting.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Services, Long> {

    @Query("select s from Services s WHERE s.serviceName = ?1 ")
    Optional<Services> findServicesByServiceName(String serviceName);
}
