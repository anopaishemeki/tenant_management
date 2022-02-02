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
            name = "contact_sequence",
            sequenceName = "contact_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "contact_sequence"
    )
    private Long id;
    private String phone;
    private String MobileNumber;
    private String email;

    public ContactDetails(String phone, String mobileNumber, String email) {
        this.phone = phone;
        MobileNumber = mobileNumber;
        this.email = email;
    }
}
