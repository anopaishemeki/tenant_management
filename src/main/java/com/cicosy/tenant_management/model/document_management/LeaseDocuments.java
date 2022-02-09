/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
/**
 *
 * @author Dejong
 */


@Entity(name="leaseDocuments")
public class LeaseDocuments extends Documents{
    
    
 
    
    private LocalDate startDate;
    private Long leaseperiod;
    private LocalDate expiryDate;

    public LeaseDocuments() {
        super();
    }

    public LeaseDocuments( LocalDate startDate, Long leaseperiod,   String name, String type, byte[] data) {
        super(name, type, data);
      
        this.startDate = startDate;
        this.leaseperiod = leaseperiod;
        
    }

    public LeaseDocuments(String name, String type, byte[] data) {
        super(name, type, data);
    }

    public LeaseDocuments(LocalDate startDate, Long leaseperiod, LocalDate expiryDate) {
        this.startDate = startDate;
        this.leaseperiod = leaseperiod;
        this.expiryDate = expiryDate;
    }
    
    



    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Long getLeaseperiod() {
        return leaseperiod;
    }

    public void setLeaseperiod(Long leaseperiod) {
        this.leaseperiod = leaseperiod;
    }
    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        
        
        this.expiryDate = this.startDate.plusMonths(leaseperiod);
    }

    @Override
    public String toString() {
        return "LeaseDocuments{ startDate=" + startDate + ", leaseperiod=" + leaseperiod  + ", expiryDate=" + expiryDate + '}';
    }



    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final LeaseDocuments other = (LeaseDocuments) obj;
     
        return true;
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
