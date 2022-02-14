package com.cicosy.tenant_management.repository.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.Optional;

public interface CompartmentRepository extends JpaRepository<Compartment, Long> {
}
