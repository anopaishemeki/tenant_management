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
    private String contact_details;
    private String residential_address;
    private String lease;
    private String property;

    public Tenant(String name, String contact_details,
                  String residential_address,
                  String lease, String property) {
        this.name = name;
        this.contact_details = contact_details;
        this.residential_address = residential_address;
        this.lease = lease;
        this.property = property;
    }
}
