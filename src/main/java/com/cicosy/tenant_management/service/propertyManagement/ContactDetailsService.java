package com.cicosy.tenant_management.service.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.ContactDetails;
import com.cicosy.tenant_management.model.propertyManagement.Owner;
import com.cicosy.tenant_management.repository.propertyManagement.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

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

    public void update(Long id, ContactDetails update) {
        ContactDetails contactDetails = contactRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Contact details with id: " + id +" does not exist"));

        if (update.getEmail() != null && update.getEmail().length() > 0 && !Objects.equals(contactDetails.getEmail(), update.getEmail())){
            contactDetails.setEmail(update.getEmail());
        }

        if (update.getMobileNumber() != null && update.getMobileNumber().length() > 0 && !Objects.equals(contactDetails.getMobileNumber(), update.getMobileNumber())){
            contactDetails.setMobileNumber(update.getEmail());
        }

        if (update.getPhone() != null && update.getPhone().length() > 0 && !Objects.equals(contactDetails.getPhone(), update.getPhone())){
            contactDetails.setPhone(update.getEmail());
        }
    }

    public ContactDetails getContact(Long contactDetails) {
        return contactRepository.findById(contactDetails).orElseThrow(() -> new  IllegalStateException ("Contact details with id: " + contactDetails +" does not exist"));
    }
}
