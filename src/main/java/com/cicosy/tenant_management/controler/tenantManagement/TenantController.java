package com.cicosy.tenant_management.controler.tenantManagement;

import com.cicosy.tenant_management.controler.propertyManagement.CompartmentController;
import com.cicosy.tenant_management.controler.propertyManagement.CompartmentController2;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.repository.leaseManagement.LeaseRepository;
import com.cicosy.tenant_management.service.leaseManagement.LeaseService;
import com.cicosy.tenant_management.service.tenantService.TenantService;
import javassist.expr.Cast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping(value = "/api/tenants")
public class TenantController {

    @Autowired
    private TenantService tenantService;
    private LeaseRepository leaseRepository;
    private CompartmentController2 compartmentController;

@Autowired
    public TenantController(TenantService tenantService, CompartmentController2 compartmentController) {
        this.tenantService = tenantService;
        this.compartmentController = compartmentController;
    }

    @GetMapping("/get-all-tenants")
    public List<Tenant> getTenants(){
        List<Tenant> tenants= tenantService.getAllTenants();
        for (int i = 0; i<tenants.size();i++){
            tenants.get(i).setCompartmentObjectlist(compartmentController.getCompartmentsForSpecificTenant(tenants.get(i).getId()));

           // tenants.get(i).setLeaseObjectlist(compartmentController.getLeasesForSpecificTenant(tenants.get(i).getId()));

        }
        return tenants;
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
        public Tenant getTenantById(@PathVariable Long id){
        return tenantService.getTenantById(id);

        }

    @GetMapping("/getTenantByID/{id}")
    public Tenant getTenantByID(@PathVariable Long id){
        Tenant tenant=tenantService.getTenantByID(id);

        tenant.setCompartmentObjectlist(compartmentController.getCompartmentsForSpecificTenant(tenant.getId()));
        return tenant;

    }



    public Tenant getTenant(Long id){
        return tenantService.getTenant(id);
        //for mpume

    }

    @GetMapping("/getTenant/{name}")
    public Tenant getTenantByName(@RequestBody Tenant tenant ,@PathVariable String name){
        return tenantService.getTenantByName(tenant, name);

    }



/* List<Lease> leases= leaseRepository.findAll();

        for (int i = 0; i<leases.size();i++){

            Long ID =Long.parseLong( String.valueOf(leases.get(i).getTenant_id()));
            leases.get(i).setTenant(tenantService.getTenant(ID));
        }*/

}


