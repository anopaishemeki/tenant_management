package com.cicosy.tenant_management.repository.accounting;

import com.cicosy.tenant_management.model.accounting.Method;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MethodRepository extends JpaRepository<Method, Long> {
}
