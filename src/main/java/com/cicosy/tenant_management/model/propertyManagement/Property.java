package com.cicosy.tenant_management.model.propertyManagement;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Property")
public class Property {
    @Id
    @SequenceGenerator(
            name = "property_sequence",
            sequenceName = "property_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "property_sequence"
    )
    private Long id;
    private String name;
    @Transient
    private Address addressObject;
    private Long address;
    private String tenant;
    private Long insurance;
    private String description;
    private String propertyType;
    @Transient
    private Owner ownerObject;
    private Long owner;
    private String status;
    private double assetValue;
    @Transient
    private ContactDetails propertyContactObject;
    private Long contact;
    private String dateAdded;
    private String dateRegistered;
    private int numberOfCompartments;
    private int numberOfFloors;

    public Property(String name, Address addressObject, Long address, String tenant, Long insurance, String description, String propertyType, Owner ownerObject, Long owner, String status, double assetValue, ContactDetails propertyContactObject, Long contact, String dateAdded, String dateRegistered, int numberOfCompartments, int numberOfFloors) {
        this.name = name;
        this.addressObject = addressObject;
        this.address = address;
        this.tenant = tenant;
        this.insurance = insurance;
        this.description = description;
        this.propertyType = propertyType;
        this.ownerObject = ownerObject;
        this.owner = owner;
        this.status = status;
        this.assetValue = assetValue;
        this.propertyContactObject = propertyContactObject;
        this.contact = contact;
        this.dateAdded = dateAdded;
        this.dateRegistered = dateRegistered;
        this.numberOfCompartments = numberOfCompartments;
        this.numberOfFloors = numberOfFloors;
    }

    public Property(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
