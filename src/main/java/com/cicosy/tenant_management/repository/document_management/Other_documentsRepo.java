package com.cicosy.tenant_management.repository.document_management;


import com.cicosy.tenant_management.model.document_management.Other_documents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Other_documentsRepo extends JpaRepository<Other_documents,Long> {
}
