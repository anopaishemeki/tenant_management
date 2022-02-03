package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Property;
import com.cicosy.tenant_management.service.propertyManagement.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/property")
public class propertyController {
    private final PropertyService propertyService;
    private final AddressController addressController;
    private final OwnerController ownerController;

    @Autowired
    public propertyController(PropertyService propertyService, AddressController addressController, OwnerController ownerController) {
        this.propertyService = propertyService;
        this.addressController = addressController;
        this.ownerController = ownerController;
    }

    @PostMapping
    public Property saveProperty(@RequestBody Property property){

        property.getAddressObject().setProperty(property.getId());

        //setting address id
        property.setAddress(addressController.saveAddress(property.getAddressObject()));

        //setting owner id
        property.setOwner(ownerController.newOwner(property.getOwnerObject()));

        propertyService.saveProperty(property);


        return property;
    }

    @GetMapping("/get-all-properties")
    public List<Property> getProperties(){
        return propertyService.getProperties();
    }

    @GetMapping("/get-property/{id}")
    public Property getProperty(@PathVariable Long id){

        Property property = propertyService.getProperty(id);

        property.setAddressObject(addressController.getAddress(property.getAddress()));

        property.setOwnerObject(ownerController.getOwner(property.getOwner()));

        return property;
    }

    @PutMapping("/update-property/{id}")
    public void updateProperty(@PathVariable Long id, @RequestBody Property property){
        propertyService.update(id, property);
    }
}
