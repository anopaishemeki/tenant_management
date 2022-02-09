/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;


import java.util.Objects;
import javax.persistence.*;


/**
 *
 * @author Dejong
 */

@Entity(name="tenantDocuments")
public class TenantDocuments  extends Documents {
    

    public TenantDocuments() {
        super();
    }

  

    public TenantDocuments(String name, String type, byte[] data) {
        super(name, type, data);
    }
   
    
}
