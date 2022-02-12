package com.cicosy.tenant_management.service.tenantService;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.repository.tenantManagement.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    public Tenant addTenant(Tenant tenant){
        return tenantRepository.save(tenant);
    }

    public List<Tenant> addTenants(List<Tenant> tenants){
        return tenantRepository.saveAll(tenants);
    }

    public String updateTenant(Long id, Tenant tenant){
        Tenant existing_tenant = tenantRepository.getById(id);
        existing_tenant.setLease(tenant.getLease());
        existing_tenant.setPhone(tenant.getPhone());
        existing_tenant.setName(tenant.getName());
        existing_tenant.setProperty(tenant.getProperty());
        existing_tenant.setId_passport(tenant.getId_passport());

        tenantRepository.save(existing_tenant);

        return "Tenant updated successfully";
    }


    public List<Tenant> getAll() {
        return tenantRepository.findAll();
    }

    public Tenant getTenant(Tenant tenant, String )
}
