package com.cicosy.tenant_management.model.document_management;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@Entity
@Table(name="other_documents")
public class Other_documents {


    @Id
    @SequenceGenerator(
            name = "otherDocuments_sequence",
            sequenceName = "otherDocuments_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "otherDocuments_sequence"
    )
    private Long id;
    @Column(name = "tenantId")
    private String tenantId;
    @Column(name = "document_name")
    private String document_name;
    @Column(name = "otherFile")
    private String otherFile;


    public Other_documents() {
    }

    public Other_documents(String tenantId, String document_name,String otherFile) {
        this.tenantId = tenantId;
        this.document_name = document_name;
        this.otherFile=otherFile;

    }

    public Long getId() {
        return id;
    }


    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getDocument_name() {
        return document_name;
    }

    public void setDocument_name(String document_name) {
        this.document_name = document_name;
    }



}
