package com.cicosy.tenant_management.model.propertyManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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
    private int floorNumber;
    private int floorArea;
    private double rentalRate;
    private String status;
    private String compartmentNumber;
    private String description;
    @Transient
    private Tenant tenantObject;
    private Long tenant;

    public Compartment(Long property, int floorNumber, int floorArea, double rentalRate, String status, String compartmentNumber, Tenant tenantObject, Long tenant) {
        this.property = property;
        this.floorNumber = floorNumber;
        this.floorArea = floorArea;
        this.rentalRate = rentalRate;
        this.status = status;
        this.compartmentNumber = compartmentNumber;
        this.tenantObject = tenantObject;
        this.tenant = tenant;
    }
}
