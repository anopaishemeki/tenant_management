package com.cicosy.tenant_management.model.propertyManagement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
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

    public Property(String name, String address, String tenant) {
        this.name = name;
        this.address = address;
        this.tenant = tenant;
    }
}
