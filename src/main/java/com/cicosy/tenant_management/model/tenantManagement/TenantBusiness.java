package com.cicosy.tenant_management.model.tenantManagement;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Data
@Getter
@Setter
public class TenantBusiness {

    private String business_name;
    private String business_type;
    private String services;
    private String shop_number;

}
