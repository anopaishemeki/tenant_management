/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;



import javax.persistence.*;


/**
 *
 * @author Dejong
 */

@Entity
@Table(name="lease_documents")
public class LeaseDocuments  extends Documents {
    private int leaseID;

    public LeaseDocuments() {
        super();
    }

    public int getLeaseID() {
        return leaseID;
    }

    public void setLeaseID(int leaseID) {
        this.leaseID = leaseID;
    }

    public LeaseDocuments(String name, String type, byte[] data, int leaseID) {
        super(name, type, data);
        this.leaseID = leaseID;
    }

    public LeaseDocuments(String name, String type, byte[] data) {
        super(name, type, data);

    }
   
    
}
