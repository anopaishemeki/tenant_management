package com.cicosy.tenant_management.repository.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.leaseManagement.LeaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaseHistoryRepository
        extends JpaRepository<LeaseHistory,Long> {
//    @Query("select s from Lease s WHERE s.name = ?1 ")
  /*  Optional<LeaseHistory>findLeaseByName(String name);*/

//    @Query("select s from Lease s WHERE s.buildingLocation = ?1 ")
   /* Optional<LeaseHistory>findLeaseByBuildingLocation(String buildingLocation);*/

    @Query("select s from LeaseHistory s where  s.action='Renewed' order by s.actionDate desc ")
    List<LeaseHistory> getRenewed();

}
