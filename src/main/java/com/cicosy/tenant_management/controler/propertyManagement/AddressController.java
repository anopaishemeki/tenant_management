package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Address;
import com.cicosy.tenant_management.service.propertyManagement.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/address")
public class AddressController {
    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    public Long saveAddress(Address address){
        addressService.saveAddress(address);
        System.out.println(address);
        return address.getId();
    }
}
