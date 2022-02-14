package com.cicosy.tenant_management.model.tenantManagement;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tenant {
    @Id

    @SequenceGenerator(
            name = "tenant_sequence",
            sequenceName = "tenant_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "tenant_sequence"
    )
    private Long id;

    private String name;
    private  String surname;

    private String email;
    private String phone;
    private String id_passport;

    @Embedded
    private Address address;

    @Embedded
    private TenantBusiness tenantBusiness;

    private String lease;
    private String property;


    public Tenant(String name,String surname, String email, String phone,
                  String id_passport, String residential_address,
                  String lease, String property) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.id_passport = id_passport;
        this.lease = lease;
        this.property = property;
    }

}
