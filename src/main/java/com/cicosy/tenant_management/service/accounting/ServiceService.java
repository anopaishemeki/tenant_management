package com.cicosy.tenant_management.service.accounting;

import com.cicosy.tenant_management.model.accounting.Services;
import com.cicosy.tenant_management.repository.accounting.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public Services save(Services service){
        serviceRepository.save(service);
        return serviceRepository.findById(service.getId()).orElseThrow(() -> new  IllegalStateException ("Saving Failed"));
    }

    public List<Services> getAllServices(){
        return serviceRepository.findAll();
    }

    public Services getService(Long id){
        return serviceRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Service with "+id+" not found"));
    }
}
