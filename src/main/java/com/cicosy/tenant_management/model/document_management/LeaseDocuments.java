/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;





import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity

@Table(name = "lease_documents")
public class LeaseDocuments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "file_name")
	private String fileName;
	
	@Column(name = "file_path")
	private String filePath;
	
	@Column(name = "file_type")
	private String fileType;
	
	@Column(name = "file_size")
	private String fileSize;

    @Column(name = "tenant_id" )
    private String tenant_id;
	

	public LeaseDocuments() {
		
	}

	public LeaseDocuments(Long id, String fileName, String filePath, String fileType,
			String fileSize) {
		this.id = id;
		this.fileName = fileName;
		this.filePath = filePath;
		this.fileType = fileType;
		this.fileSize = fileSize;
		
	}

	public LeaseDocuments(String fileName, String filePath,  String fileSize,String fileType,String tenant_id) {
		this.fileName = fileName;
		this.filePath = filePath;
		this.fileType = fileType;
		this.fileSize = fileSize;
		this.tenant_id=tenant_id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
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

    @Override
    public String toString() {
        return "LeaseDocuments [id=" + id +  ", fileName=" + fileName
                + ", filePath=" + filePath + ", fileType=" + fileType +", tenant_id=" + tenant_id + ", fileSize=" + fileSize +"]";
    }


}
