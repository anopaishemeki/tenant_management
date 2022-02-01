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
public class Address {
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
    private String id;
    private String name;
    private String name2;
    private String address;
    private String zipCode;
    private String city;
    private String country;

    public Address(String name, String name2, String address, String zipCode, String city, String country) {
        this.name = name;
        this.name2 = name2;
        this.address = address;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
    }
}
