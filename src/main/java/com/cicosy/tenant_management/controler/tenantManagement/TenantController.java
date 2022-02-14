package com.cicosy.tenant_management.controler.tenantManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.service.tenantService.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @PostMapping("/addTenant")
    public Tenant addTenant(@RequestBody Tenant tenant){
        return tenantService.addTenant(tenant);
    }

    @PostMapping("/addTenants")
    public List<Tenant> addTenants(@RequestBody List<Tenant> tenants){
        return tenantService.addTenants(tenants);
    }

    @PutMapping("/updateTenant/{id}")
    public String updateTenant(@PathVariable Long id,@RequestBody Tenant tenant){
        return tenantService.updateTenant(id, tenant);
    }


}
