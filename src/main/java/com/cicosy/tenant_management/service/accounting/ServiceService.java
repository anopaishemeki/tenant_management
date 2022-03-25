package com.cicosy.tenant_management.service.accounting;

import com.cicosy.tenant_management.model.accounting.Services;
import com.cicosy.tenant_management.model.leaseManagement.Lease;
import com.cicosy.tenant_management.repository.accounting.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public Services save(Services service){

        Optional<Services> serviceName = serviceRepository.findServicesByServiceName(service.getServiceName());


        if (serviceName.isPresent()) {
            throw new IllegalStateException("Record with provided name already Exists");

        }

        serviceRepository.save(service);
        return serviceRepository.findById(service.getId()).orElseThrow(() -> new  IllegalStateException ("Saving Failed"));
    }

    public List<Services> getAllServices(){
        return serviceRepository.findAll();
    }

    public Services getService(Long id){
        return serviceRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Service with "+id+" not found"));
    }

    public void deleteService(Long id) {
        serviceRepository.deleteAllById(Collections.singleton(id));
    }

    public void updateService(Long id, Services updateDetails) throws Exception {

        System.out.println(updateDetails);

        Services service = serviceRepository.findById(id).orElseThrow(()->new Exception("Service with id :" + id+" does not exist"));

        service.setServiceName(updateDetails.getServiceName());
        service.setAmount(updateDetails.getAmount());

        serviceRepository.save(service);


    }
}
