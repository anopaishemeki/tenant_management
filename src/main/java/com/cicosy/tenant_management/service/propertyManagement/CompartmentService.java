package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.repository.propertyManagement.CompartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompartmentService {
    CompartmentRepository compartmentRepository;

    @Autowired
    public CompartmentService(CompartmentRepository compartmentRepository) {
        this.compartmentRepository = compartmentRepository;
    }

    public Compartment save(Compartment compartment){
        compartmentRepository.save(compartment);
        return compartmentRepository.findById(compartment.getId()).orElseThrow(() -> new  IllegalStateException ("Compartment with id: " + compartment.getId() +" does not exist"));
    }

    public Compartment getCompartment(Long id) {
        return compartmentRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Compartment with id: " + id +" does not exist"));

    }

    public List<Compartment> getCompartments() {
        return compartmentRepository.findAll();
    }

    public List<Compartment> getCompartmentsForSpecificProperty(Long id) {
        return compartmentRepository.findByProperty(id);
    }
}
