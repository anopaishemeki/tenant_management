package com.cicosy.tenant_management.model.propertyManagement;

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
    private String shopNumber;
    private double rentalPrice;
    private String status;
    private int compartmentNumber;

    public Compartment(Long property, int floorNumber, int floorArea, String shopNumber, double rentalPrice, String status, int compartmentNumber) {
        this.property = property;
        this.floorNumber = floorNumber;
        this.floorArea = floorArea;
        this.shopNumber = shopNumber;
        this.rentalPrice = rentalPrice;
        this.status = status;
        this.compartmentNumber = compartmentNumber;
    }
}
