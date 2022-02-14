package com.cicosy.tenant_management.repository.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
