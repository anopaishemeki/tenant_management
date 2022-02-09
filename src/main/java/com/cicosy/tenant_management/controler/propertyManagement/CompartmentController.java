package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.service.propertyManagement.CompartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/compartment")
public class CompartmentController {
    CompartmentService compartmentService;

    @Autowired
    public CompartmentController(CompartmentService compartmentService) {
        this.compartmentService = compartmentService;
    }

    @PostMapping("/save-compartment")
    public void saveCompartment(@RequestBody Compartment compartment){
        compartmentService.save(compartment);
    }
}
