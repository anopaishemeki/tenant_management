package com.cicosy.tenant_management.controler.propertyManagement;

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

    @Autowired
    public CompartmentController(CompartmentService compartmentService) {
        this.compartmentService = compartmentService;
    }

    @PostMapping("/save-compartment")
    public void saveCompartment(@RequestBody Compartment compartment){
        compartmentService.save(compartment);
    }

    @GetMapping("/get-compartments")
    public List<Compartment> getCompartments(){
        return compartmentService.getCompartments();
    }

    @GetMapping("/get-compartments-for-specific-property/{id}")
    public List<Compartment> getCompartmentsForSpecificProperty(@PathVariable Long id){
        return compartmentService.getCompartmentsForSpecificProperty(id);
    }

    @GetMapping("/get-compartment/{id}")
    public Compartment getCompartmentSpecificCompartment(@PathVariable Long id){
        return compartmentService.getCompartment(id);
    }

    public Compartment getCompartment(Long id){
        return compartmentService.getCompartment(id);
    }
}
