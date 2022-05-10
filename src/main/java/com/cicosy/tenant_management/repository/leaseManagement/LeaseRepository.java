package com.cicosy.tenant_management.repository.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaseRepository
        extends JpaRepository<Lease,Long> {
   /* @Query("select s from Lease s WHERE s.name = ?1 ")
    Optional<Lease>findLeaseByName(String name);

    @Query("select s from Lease s WHERE s.buildingLocation = ?1 ")
    Optional<Lease>findLeaseByBuildingLocation(String buildingLocation);*/

//    @Query("select s,p from lease s,lease_documents p where s.Status=?1  and s.id= p.id")
//    List<LeaseDocuments> findstatus(String status);



    List<Lease> findLeaseByStatus(String status);

//    -------------------------------------------------------

    @Query("select s from Lease s where s.timeLeft<=?1 and s.status<>'Terminated' order by s.timeLeft asc ")
     List<Lease> findbyExpirery(int time);



    @Query(value = "select p.email,p.phone from tenant p where p.b_email=?1",nativeQuery = true)
    String findByEmail(String name);


//    @Query(value = "select s from Lease s where lower(s.name) like lower('%:record%') or lower(s.status) like lower('%:record%') or lower(s.buildingLocation) like lower('%:record%') or lower(s.buildingName) like lower('%:record%') order by s.id asc ")
    @Query("Select c from Lease c where lower(c.status) like lower(concat('%', concat(:record, '%'))) or lower(c.id) like lower(concat('%', concat(:record, '%'))) order by c.id asc")
    List<Lease> findLeaseBySearch(@Param("record")String record);

    @Query(value = "select file_name from lease_documents  where tenant_id=?1 ",nativeQuery = true)
    String findTenantForm(String id);

    @Query(value ="select * from lease where tenant_id=?1" , nativeQuery = true)
    List<Lease> findTenant(String id);


  /*  List<Lease> findByTenant_id(int id);*/

    //    List<Lease>findLeasesByNameIsLikeOrBuildingLocationIsLikeOrBuildingNameIsLike(String record);
    //    Lease findByEmail(String name, String surname);
}
