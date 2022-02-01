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
        if (update.getTenant() != null && update.getTenant().length() > 0 && !Objects.equals(property.getTenant(), update.getTenant())){
            property.setTenant(update.getTenant());
        }
    }
}
