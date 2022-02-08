package com.cicosy.tenant_management.model.tenantManagement;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Data
@Getter
@Setter
public class Address {

    private String house_no;
    private String street;
    private String city;
    private String country;
}
