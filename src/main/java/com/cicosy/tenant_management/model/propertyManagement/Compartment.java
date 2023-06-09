package com.cicosy.tenant_management.model.propertyManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Compartment {
    @Id
    @SequenceGenerator(
            name = "compartment_sequence",
            sequenceName = "compartment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "compartment_sequence"
    )
    private Long id;
    private Long property;
    private String floorNumber;
    private double floorArea;
    private double rentalRate;
    private String status;
    private String compartmentNumber;
    private String description;
    @Transient
    private Tenant tenantObject;
    private Long tenant;

    public Compartment(Long property, String floorNumber, double floorArea, double rentalRate, String status, String compartmentNumber, Tenant tenantObject, Long tenant) {
        this.property = property;
        this.floorNumber = floorNumber;
        this.floorArea = floorArea;
        this.rentalRate = rentalRate;
        this.status = "0";
        this.compartmentNumber = compartmentNumber;
        this.tenantObject = tenantObject;
        this.tenant = tenant;
    }

    public Long getTenant() {
        return tenant;
    }

    public void setTenantObject(Tenant tenantObject) {
        this.tenantObject = tenantObject;
    }

    public void setTenant(Long tenant) {
        this.tenant = tenant;
    }


    public void setStatus(String status) {
        this.status = status;
    }
}
