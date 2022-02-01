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
    private String Name;
    private String address;
    private String contactDetails;

    public Owner(String name, String address, String contactDetails) {
        Name = name;
        this.address = address;
        this.contactDetails = contactDetails;
    }
}
