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
    private String address;
    private String tenant;
    private String description;
    private String propertyType;
    private String city;
    private String owner;
    private String province;
    private String status;

    public Property(String name, String address, String tenant) {
        this.name = name;
        this.address = address;
        this.tenant = tenant;
    }
}
