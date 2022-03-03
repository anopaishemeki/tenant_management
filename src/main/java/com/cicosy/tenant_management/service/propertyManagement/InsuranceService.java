package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Insurance;
import com.cicosy.tenant_management.repository.propertyManagement.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceService {
    private final InsuranceRepository insuranceRepository;

    @Autowired
    public InsuranceService(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    public Insurance  getInsurance(Long id){
        return insuranceRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Insurance with id: " + id +" does not exist"));

    }
}
