package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Insurance;
import com.cicosy.tenant_management.service.propertyManagement.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/insurance")
public class InsuranceController {
    private final InsuranceService insuranceService;

    @Autowired
    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    @GetMapping("/getInsurance/{id}")
    public Insurance getInsurance(@PathVariable Long id){
        return insuranceService.getInsurance(id);
    }
}
