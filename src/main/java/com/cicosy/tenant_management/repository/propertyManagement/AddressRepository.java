package com.cicosy.tenant_management.repository.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    @Override
    Optional<Address> findById(Long aLong);
}
