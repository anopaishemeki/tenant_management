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
public class Insurance {
    @Id
    @SequenceGenerator(
            name = "insurance_sequence",
            sequenceName = "insurance_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "insurance_sequence"
    )
    private Long id;
    private String name;
    private String policy;
    @Transient
    private ContactDetails contactDetailsObject;
    private Long contact;
    @Transient
    private Address addressObject;
    private Long address;
}
