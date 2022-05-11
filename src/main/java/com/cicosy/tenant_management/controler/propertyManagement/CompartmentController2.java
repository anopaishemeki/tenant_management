package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.model.tenantManagement.Tenant;
import com.cicosy.tenant_management.service.leaseManagement.LeaseService;
import com.cicosy.tenant_management.service.propertyManagement.CompartmentService;
import com.cicosy.tenant_management.service.tenantService.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/compartment2")
public class CompartmentController2 {
    private CompartmentService compartmentService;
    private TenantService tenantService;

    @Autowired
    public CompartmentController2(CompartmentService compartmentService, TenantService tenantService) {
        this.compartmentService = compartmentService;
        this.tenantService = tenantService;

    }

    public List<Compartment> getCompartmentsForSpecificTenant(Long id){
        return compartmentService.getCompartmentsForSpecificTenant(id);

    }
   /* public List<Lease> getLeasesForSpecificTenant(Long id){
        int Id=Integer.parseInt(id.toString());
        return tenantService.findLeasesByTenant_id(Id);

    }*/
    public Tenant getTenantForSpecificLease(int tenant_id) {

        return tenantService.getTenantByID(Long.parseLong(String.valueOf(tenant_id)));
    }
}
