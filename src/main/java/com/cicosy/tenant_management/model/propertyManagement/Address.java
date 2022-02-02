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
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "address_sequence"
    )
    private Long id;
    private String name;
    private String name2;
    private String address;
    private String zipCode;
    private String city;
    private String country;
    private Long property;

    public Address(String name, String name2, String address, String zipCode, String city, String country, Long property) {
        this.name = name;
        this.name2 = name2;
        this.address = address;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
        this.property = property;
    }
}
