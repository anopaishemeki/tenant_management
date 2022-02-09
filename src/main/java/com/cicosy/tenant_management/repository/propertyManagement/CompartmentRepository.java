package com.cicosy.tenant_management.repository.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompartmentRepository extends JpaRepository<Compartment, Long> {
}
