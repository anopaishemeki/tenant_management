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





import com.cicosy.tenant_management.model.document_management.NoticeDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface NoticeDocumentRepo extends JpaRepository<NoticeDocuments, Long> {

}