package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.service.propertyManagement.CompartmentService;
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

    @Autowired
    public CompartmentController2(CompartmentService compartmentService) {
        this.compartmentService = compartmentService;
    }

    public List<Compartment> getCompartmentsForSpecificTenant(Long id){
        return compartmentService.getCompartmentsForSpecificTenant(id);

    }
}
