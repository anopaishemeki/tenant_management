package com.cicosy.tenant_management.repository.accounting;

import com.cicosy.tenant_management.model.accounting.Services;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Services, Long> {
}
