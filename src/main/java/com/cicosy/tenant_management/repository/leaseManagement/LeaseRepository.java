package com.cicosy.tenant_management.repository.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaseRepository
        extends JpaRepository<Lease,Long> {
//    @Query("select s from Lease s WHERE s.name = ?1 ")
    Optional<Lease>findLeaseByName(String name);

//    @Query("select s from Lease s WHERE s.buildingLocation = ?1 ")
    Optional<Lease>findLeaseByBuildingLocation(String buildingLocation);


    List<Lease> findLeaseByStatus(String status);
}
