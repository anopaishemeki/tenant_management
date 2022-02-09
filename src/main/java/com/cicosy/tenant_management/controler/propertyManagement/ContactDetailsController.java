package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.ContactDetails;
import com.cicosy.tenant_management.service.propertyManagement.ContactDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/contact-details")
public class ContactDetailsController {
    private final ContactDetailsService contactDetailsService;

    @Autowired
    public ContactDetailsController(ContactDetailsService contactDetailsService) {
        this.contactDetailsService = contactDetailsService;
    }

    public Long saveContact(ContactDetails contactDetails){
        contactDetailsService.saveContactDetails(contactDetails);
        return contactDetails.getId();
    }

    @PutMapping("/update-contact-details/{id}")
    public void updateContactDetails(@PathVariable Long id, @RequestBody ContactDetails contactDetails){
        contactDetailsService.update(id, contactDetails);
    }

    public ContactDetails getContact(Long contactDetails) {
        return contactDetailsService.getContact(contactDetails);
    }
}
