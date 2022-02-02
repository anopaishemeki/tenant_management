package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.ContactDetails;
import com.cicosy.tenant_management.repository.propertyManagement.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactDetailsService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactDetailsService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void saveContactDetails(ContactDetails contactDetails){
        contactRepository.save(contactDetails);
    }
}
