package com.cicosy.tenant_management.repository.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface CompartmentRepository extends JpaRepository<Compartment, Long> {
    @Query("SELECT s FROM Compartment  s WHERE s.property = ?1")
    List<Compartment> findByProperty(Long id);
}
