/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.repository.document_management;


import com.cicosy.tenant_management.model.document_management.LeaseDocuments;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Dejong
 */
@Repository
public interface LeaseDocumentsRepo extends JpaRepository<LeaseDocuments, Long> {
          @Query("select s,p  from Lease s,LeaseDocuments p WHERE s.status = ?1 and s.id and p.id ")
          List<LeaseDocuments> findExpired(String status);
   }
