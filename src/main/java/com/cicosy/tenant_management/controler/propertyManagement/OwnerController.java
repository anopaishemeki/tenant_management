package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Owner;
import com.cicosy.tenant_management.service.propertyManagement.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/owner")
public class OwnerController {
    private final OwnerService ownerService;
    private final AddressController addressController;
    private final ContactDetailsController contactDetailsController;

    @Autowired
    public OwnerController(OwnerService ownerService, AddressController addressController, ContactDetailsController contactDetailsController) {
        this.ownerService = ownerService;
        this.addressController = addressController;
        this.contactDetailsController = contactDetailsController;
    }

    public Long newOwner(Owner owner){

        owner.setAddress(addressController.saveAddress(owner.getAddressObject()));

        owner.setContactDetails(contactDetailsController.saveContact(owner.getContactDetailsObject()));

        ownerService.saveOwner(owner);
        return owner.getId();
    }

    @PutMapping("/update-owner/{id}")
    public Owner updateOwner(@PathVariable Long id, @RequestBody Owner owner){
        return ownerService.update(id, owner);
    }

    @GetMapping("get-owner/{id}")
    public Owner getOwnerAPI(@PathVariable Long id) {
        return ownerService.getOwner(id);
    }

    public Owner getOwner(Long id) {
        Owner owner = ownerService.getOwner(id);
        owner.setAddressObject(addressController.getAddress(owner.getAddress()));
        owner.setContactDetailsObject(contactDetailsController.getContact(owner.getContactDetails()));

        return owner;
    }
}
