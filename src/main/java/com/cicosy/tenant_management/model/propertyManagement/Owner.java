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
public class Owner {
    @Id
    @SequenceGenerator(
            name = "owner_sequence",
            sequenceName = "owner_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "owner_sequence"
    )
    private Long id;
    private String name;
    private Long address;
    @Transient
    private Address addressObject;
    private Long contactDetails;
    @Transient
    private ContactDetails contactDetailsObject;

    public Owner(String name, Long address, Address addressObject, Long contactDetails, ContactDetails contactDetailsObject) {
        this.name = name;
        this.address = address;
        this.addressObject = addressObject;
        this.contactDetails = contactDetails;
        this.contactDetailsObject = contactDetailsObject;
    }
}
