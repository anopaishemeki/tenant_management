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
public class ContactDetails {
    @Id
    @SequenceGenerator(
            name = "contactDetails_sequence",
            sequenceName = "contactDetails_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "contactDetails_sequence"
    )
    private Long id;
    private String phone;
    private String mobileNumber;
    private String email;
}
