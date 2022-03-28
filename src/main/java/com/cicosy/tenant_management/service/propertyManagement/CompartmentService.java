package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Address;
import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.repository.propertyManagement.CompartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

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

    @Transactional
    public Compartment update(Long id, Compartment update) {
        Compartment compartment = compartmentRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Compartment with id: " + id +" does not exist"));

        if (update.getTenant() != null && !Objects.equals(compartment.getTenant(), update.getTenant())){
            compartment.setTenant(update.getTenant());
        }

        if (update.getStatus() != null && !Objects.equals(compartment.getStatus(), update.getStatus())){
            compartment.setStatus(update.getStatus());
        }

        return compartmentRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Compartment with id: " + id +" does not exist"));
    }
}
