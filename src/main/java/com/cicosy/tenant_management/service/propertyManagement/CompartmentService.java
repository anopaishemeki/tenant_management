package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import com.cicosy.tenant_management.repository.propertyManagement.CompartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompartmentService {
    CompartmentRepository compartmentRepository;

    @Autowired
    public CompartmentService(CompartmentRepository compartmentRepository) {
        this.compartmentRepository = compartmentRepository;
    }

    public void save(Compartment compartment){
        compartmentRepository.save(compartment);
    }
}
