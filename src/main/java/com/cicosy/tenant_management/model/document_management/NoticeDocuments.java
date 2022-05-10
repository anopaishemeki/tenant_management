/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "notice_documents")
public class NoticeDocuments {

    @Id
    @SequenceGenerator(
            name = "noticeDocuments_sequence",
            sequenceName = "noticeDocuments_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "noticeDocuments_sequence"
    )
    private Long id;
	private String fileName;
	private String tenant_id;
	

	public NoticeDocuments() {
		
	}

	public NoticeDocuments(String fileName,String tenant_id){
		this.fileName = fileName;
		this.tenant_id=tenant_id;
		
	}

	public Long getId() {
		return id;
	}

	public String getTenant_id() {
		return tenant_id;
	}

	public void setTenant_id(String tenant_id) {
		if(tenant_id.isEmpty()){
			tenant_id="null";
		}else{
			this.tenant_id = tenant_id;
		}

	}

	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


}
