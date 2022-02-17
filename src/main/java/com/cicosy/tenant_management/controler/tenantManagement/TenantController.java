package com.cicosy.tenant_management.controler.tenantManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.service.tenantService.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @GetMapping("/get-all-tenants")
    public List<Tenant> getTenants(){
        return tenantService.getAll();
    }

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

        @GetMapping("/getTenant/{id}")
        public Tenant getTenantById(@RequestBody Tenant tenant ,@PathVariable Long id){
        return tenantService.getTenantById(tenant, id);

        }

    public Tenant getTenant(Long id){
        return tenantService.getTenant(id);
        //for mpume

    }

    @GetMapping("/getTenant/{name}")
    public Tenant getTenantByName(@RequestBody Tenant tenant ,@PathVariable String name){
        return tenantService.getTenantByName(tenant, name);

    }


}
