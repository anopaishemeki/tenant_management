package com.cicosy.tenant_management.repository.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments,Long> {
//    //    @Query("select s from Lease s WHERE s.name = ?1 ")
//    Optional<Payments>findLeaseByBuildingName(String buildingName);
//
//    //    @Query("select s from Lease s WHERE s.buildingLocation = ?1 ")
//    Optional<Payments>findPaymentsByBuildingLocation(String buildingLocation);

}
