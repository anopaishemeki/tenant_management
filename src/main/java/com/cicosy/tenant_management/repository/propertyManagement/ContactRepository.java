package com.cicosy.tenant_management.repository.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.ContactDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactDetails, Long> {
}
