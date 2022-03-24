/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.repository.document_management;




/**
 *
 * @author Dejong
 */




import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TenantsDocumentRepo extends JpaRepository<TenantDocuments, Long> {

    @Query(value = "select * from tenant_documents where tenant_id=?1",nativeQuery = true)
    List<TenantDocuments> findLeaseBySearch(@Param("tenantId")String id);


}