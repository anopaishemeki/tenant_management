package com.cicosy.tenant_management.model.propertyManagement;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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
    private String city;
    private Long owner;
    private String province;
    private String status;
    private double assetValue;

    public Property(String name, Long address, String tenant, Long insurance, String description, String propertyType, String city, Long owner, String province, String status, double assetValue) {
        this.name = name;
        this.address = address;
        this.tenant = tenant;
        this.insurance = insurance;
        this.description = description;
        this.propertyType = propertyType;
        this.city = city;
        this.owner = owner;
        this.province = province;
        this.status = status;
        this.assetValue = assetValue;
    }
}
