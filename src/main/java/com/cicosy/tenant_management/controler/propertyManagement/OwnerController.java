package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Owner;
import com.cicosy.tenant_management.service.propertyManagement.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        owner.setContactDetails(contactDetailsController.saveConontact(owner.getContactDetailsObject()));

        ownerService.saveOwner(owner);
        return owner.getId();
    }
}
