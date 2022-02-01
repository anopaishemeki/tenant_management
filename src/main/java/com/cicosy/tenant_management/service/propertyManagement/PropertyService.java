package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.Property;
import com.cicosy.tenant_management.repository.propertyManagement.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public void saveProperty(Property property){
        propertyRepository.save(property);
    }

    public List<Property> getProperty(){
        return propertyRepository.findAll();
    }


    @Transactional
    public void update(Long id, Property update) {
        Property property = propertyRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Property with id" + id +" does not exist"));

        if (update.getName() != null && update.getName().length() > 0 && !Objects.equals(property.getName(), update.getName())){
            property.setName(update.getName());
        }

        if (update.getAddress() != null && update.getAddress().length() > 0 && !Objects.equals(property.getAddress(), update.getAddress())){
            property.setAddress(update.getAddress());
        }

        if (update.getTenant() != null && update.getTenant().length() > 0 && !Objects.equals(property.getTenant(), update.getTenant())){
            property.setTenant(update.getTenant());
        }
        if (update.getDescription() != null && update.getDescription().length() > 0 && !Objects.equals(property.getDescription(), update.getDescription())){
            property.setDescription(update.getDescription());
        }

        if (update.getPropertyType() != null && update.getPropertyType().length() > 0 && !Objects.equals(property.getPropertyType(), update.getPropertyType())){
            property.setPropertyType(update.getPropertyType());
        }

        if (update.getCity() != null && update.getCity().length() > 0 && !Objects.equals(property.getCity(), update.getCity())){
            property.setCity(update.getCity());
        }

        if (update.getProvince() != null && update.getProvince().length() > 0 && !Objects.equals(property.getProvince(), update.getProvince())){
            property.setProvince(update.getProvince());
        }

        if (update.getStatus() != null && update.getStatus().length() > 0 && !Objects.equals(property.getStatus(), update.getStatus())){
            property.setStatus(update.getStatus());
        }

        if (update.getOwner() != null && update.getOwner().length() > 0 && !Objects.equals(property.getOwner(), update.getOwner())){
            property.setOwner(update.getOwner());
        }
    }
}
