package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Owner;
import com.cicosy.tenant_management.model.propertyManagement.Property;
import com.cicosy.tenant_management.repository.propertyManagement.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;

    @Autowired
    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public void saveOwner(Owner owner){
        ownerRepository.save(owner);
    }

    @Transactional
    public Owner update(Long id, Owner update) {
        Owner owner = ownerRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Owner with id: " + id +" does not exist"));

        if (update.getName() != null && update.getName().length() > 0 && !Objects.equals(owner.getName(), update.getName())){
            owner.setName(update.getName());
        }

        if (update.getLastName() != null && update.getLastName().length() > 0 && !Objects.equals(owner.getLastName(), update.getLastName())){
            owner.setLastName(update.getLastName());
        }

        return ownerRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Owner with id: " + id +" does not exist"));
    }

    public Owner getOwner(Long owner) {
        return ownerRepository.findById(owner).orElseThrow(() -> new  IllegalStateException ("Owner with id: " + owner +" does not exist"));
    }
}
