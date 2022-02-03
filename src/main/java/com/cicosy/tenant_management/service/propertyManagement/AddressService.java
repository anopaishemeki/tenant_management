package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Address;
import com.cicosy.tenant_management.model.propertyManagement.ContactDetails;
import com.cicosy.tenant_management.repository.propertyManagement.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void saveAddress(Address address){
        addressRepository.save(address);
    }

    public void update(Long id, Address update) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Addresss with id: " + id +" does not exist"));

        if (update.getAddress() != null && update.getAddress().length() > 0 && !Objects.equals(address.getAddress(), update.getAddress())){
            address.setAddress(update.getAddress());
        }

        if (update.getCity() != null && update.getCity().length() > 0 && !Objects.equals(address.getCity(), update.getCity())){
            address.setCity(update.getCity());
        }

        if (update.getName2() != null && update.getName().length() > 0 && !Objects.equals(address.getName(), update.getName())){
            address.setName(update.getName());
        }

        if (update.getName2() != null && update.getName2().length() > 0 && !Objects.equals(address.getName2(), update.getName2())){
            address.setName2(update.getName2());
        }

        if (update.getZipCode() != null && update.getZipCode().length() > 0 && !Objects.equals(address.getZipCode(), update.getZipCode())){
            address.setZipCode(update.getZipCode());
        }

        if (update.getCountry() != null && update.getCountry().length() > 0 && !Objects.equals(address.getCountry(), update.getCountry())){
            address.setCountry(update.getCountry());
        }
    }

    public Address getAddress(Long address) {
        return addressRepository.findById(address).orElseThrow(() -> new  IllegalStateException ("Addresss with id: " + address +" does not exist"));
    }
}
