package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.model.accounting.Services;
import com.cicosy.tenant_management.service.accounting.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    private final ServiceService serviceService;

    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PostMapping("/save-service")
    public Services saveService(@RequestBody Services service){
        return serviceService.save(service);
    }

    @GetMapping("/get-all-services")
    public List<Services> getAllServices(){
        return serviceService.getAllServices();
    }

    @GetMapping("/get-specific-service/{id}")
    public Services getService(@PathVariable Long id){
        return serviceService.getService(id);
    }

    @DeleteMapping("/delete-service/{id}")
    public void deleteService(@PathVariable Long id){
        serviceService.deleteService(id);
    }

    @PutMapping("/updateService/{id}")
    public  void updateService(@PathVariable Long id ,  @RequestBody Services updateDetails) throws Exception{
        System.out.println(updateDetails);
        serviceService.updateService(id,updateDetails);
    }

}
