package com.cicosy.tenant_management.model.document_management;


import javax.persistence.*;

@Entity
@Table(name="other_documents")
public class Other_documents {


    @Id
    @SequenceGenerator(
            name = "otherdocuments_sequence",
            sequenceName = "otherdocuments_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "otherdocuments_sequence"
    )

    private Long id;
    private String tenantId;
    private String document_name;
    private  String document;

    public Other_documents() {
    }

    public Other_documents(String tenantId, String document_name, String document) {
        this.tenantId = tenantId;
        this.document_name = document_name;
        this.document = document;
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

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }
}
