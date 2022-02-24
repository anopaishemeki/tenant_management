package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Property;
import com.cicosy.tenant_management.service.propertyManagement.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/property")
public class propertyController {
    private final PropertyService propertyService;
    private final AddressController addressController;
    private final OwnerController ownerController;
    private final ContactDetailsController contactDetailsController;

    @Autowired
    public propertyController(PropertyService propertyService, AddressController addressController, OwnerController ownerController, ContactDetailsController contactDetailsController) {
        this.propertyService = propertyService;
        this.addressController = addressController;
        this.ownerController = ownerController;
        this.contactDetailsController = contactDetailsController;
    }

    @PostMapping("/save-property")
    public Property saveProperty(@RequestBody Property property){

        property.getAddressObject().setProperty(property.getId());

        //setting address id
        property.setAddress(addressController.saveAddress(property.getAddressObject()));

        //setting owner id
        property.setOwner(ownerController.newOwner(property.getOwnerObject()));

        //setting contact object
        property.setContact(contactDetailsController.saveContact(property.getPropertyContactObject()));

        propertyService.saveProperty(property);


        return property;
    }

    @GetMapping("/get-all-properties")
    public List<Property> getProperties(){
        List<Property> properties =  propertyService.getProperties();

        for(int i = 0; i < properties.size(); i++){
            properties.get(i).setAddressObject(addressController.getAddress( properties.get(i).getAddress()));
            properties.get(i).setOwnerObject(ownerController.getOwner( properties.get(i).getOwner()));
            properties.get(i).setPropertyContactObject(contactDetailsController.getContact(properties.get(i).getContact()));
        }


        return  properties;
    }

    @GetMapping("/get-property/{id}")
    public Property getProperty(@PathVariable Long id){

        Property property = propertyService.getProperty(id);

        property.setAddressObject(addressController.getAddress(property.getAddress()));

        property.setOwnerObject(ownerController.getOwner(property.getOwner()));

        property.setPropertyContactObject(contactDetailsController.getContact(property.getContact()));

        return property;
    }

    @PutMapping("/update-property/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property){
        propertyService.update(id, property);
        return propertyService.getProperty(id);
    }

    @GetMapping("/get-property-id-and-name")
    public List<Object> propertyIdAndName(){
        return propertyService.getPropertyIdAndName();
    }
}
