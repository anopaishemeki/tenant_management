package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Property;
import com.cicosy.tenant_management.service.propertyManagement.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/property")
public class propertyController {
    private PropertyService propertyService;

    @Autowired
    public propertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping
    public Property saveProperty(@RequestBody Property property){
        propertyService.saveProperty(property);
        return property;
    }

    @GetMapping
    public List<Property> getProperties(){
        return propertyService.getProperty();
    }

    @PutMapping("/{id}")
    public void updateProperty(@PathVariable Long id, @RequestBody Property property){
        propertyService.update(id, property);
    }
}
