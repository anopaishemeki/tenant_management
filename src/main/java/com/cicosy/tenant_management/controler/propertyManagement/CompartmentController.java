package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.controler.leaseManagement.LeaseController;
import com.cicosy.tenant_management.controler.tenantManagement.TenantController;
import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.service.propertyManagement.CompartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/compartment")
public class CompartmentController {
    CompartmentService compartmentService;
    TenantController tenantController;
    LeaseController leaseController;

    @Autowired
    public CompartmentController(CompartmentService compartmentService, TenantController tenantController, LeaseController leaseController) {
        this.compartmentService = compartmentService;
        this.tenantController = tenantController;
        this.leaseController = leaseController;
    }

    @PostMapping("/save-compartment")
    public Compartment saveCompartment(@RequestBody Compartment compartment){
        return compartmentService.save(compartment);
    }

    @GetMapping("/get-compartments")
    public List<Compartment> getCompartments(){
        List<Compartment> compartments = compartmentService.getCompartments();

        for (int i = 0; i < compartments.size(); i++){
            if (compartments.get(i).getTenant() != null){
                compartments.get(i).setTenantObject(tenantController.getTenant(compartments.get(i).getTenant()));
            }
        }

        return compartments;
    }

    @GetMapping("/get-compartments-for-specific-property/{id}")
    public List<Compartment> getCompartmentsForSpecificPropertyApi(@PathVariable Long id){
        List<Compartment> compartments = compartmentService.getCompartmentsForSpecificProperty(id);

        for (int i = 0; i < compartments.size(); i++){
            if (compartments.get(i).getTenant() != null){
                compartments.get(i).setTenantObject(tenantController.getTenant(compartments.get(i).getTenant()));
            }
        }

        return compartments;
    }

    public List<Compartment> getCompartmentsForSpecificProperty(Long id){
        List<Compartment> compartments = compartmentService.getCompartmentsForSpecificProperty(id);

        for (int i = 0; i < compartments.size(); i++){
            if (compartments.get(i).getTenant() != null){
                compartments.get(i).setTenantObject(tenantController.getTenant(compartments.get(i).getTenant()));
//                if(!leaseController.getLeaseByT_ID(compartments.get(i).getTenant()).isEmpty()){
//
//                }
            }
        }

        return compartments;
    }

    @GetMapping("/get-compartment/{id}")
    public Compartment getCompartmentSpecificCompartment(@PathVariable Long id){
        Compartment compartment = compartmentService.getCompartment(id);
        if (compartment.getTenant() != null){
            compartment.setTenantObject(tenantController.getTenant(compartment.getTenant()));
        }
        return compartment;
    }

    public Compartment getCompartment(Long id){
        Compartment compartment = compartmentService.getCompartment(id);
        if (compartment.getTenant() != null){
            compartment.setTenantObject(tenantController.getTenant(compartment.getTenant()));
        }
        return compartment;
    }

    @PutMapping("/update-compartment/{id}")
    public Compartment updateCompartment(@PathVariable Long id, @RequestBody Compartment compartment){
        return compartmentService.update(id, compartment);
    }
}
