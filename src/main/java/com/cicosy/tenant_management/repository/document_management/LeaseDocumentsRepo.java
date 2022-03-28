/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.repository.document_management;


import com.cicosy.tenant_management.model.document_management.LeaseDocuments;

import java.util.List;

import com.cicosy.tenant_management.model.document_management.TenantDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
/**
 *
 * @author Dejong
 */
@Repository
public interface LeaseDocumentsRepo extends JpaRepository<LeaseDocuments, Long > {
          @Query(value="SELECT p.id,p.name,p.data,p.type FROM lease_documents p INNER JOIN lease s   on p.id where p.id=s.id and s.status=?1 ",nativeQuery = true)
          List<LeaseDocuments> findExpired(String status);

          @Query(value = "select file_name from lease_documents where tenant_id=?1",nativeQuery = true)
          List<LeaseDocuments> findLeaseDocBySearch(@Param("tenantId")String id);
   }
