package com.cicosy.tenant_management.repository.document_management;


import com.cicosy.tenant_management.model.document_management.Other_documents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Other_documentsRepo extends JpaRepository<Other_documents,Long> {

    @Query(value = "select other_file from other_documents  where document_name=?2 and tenant_id=?1  ",nativeQuery = true)
    String findOther(String tenantId,String document_name);


    @Query(value = "select * from other_documents  where tenant_id=?1  ",nativeQuery = true)
    List<Other_documents> findAllOther(String tenantId);


}

