package com.cicosy.tenant_management.controler.propertyManagement;

import com.cicosy.tenant_management.model.propertyManagement.ContactDetails;
import com.cicosy.tenant_management.service.propertyManagement.ContactDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/contact-details")
public class ContactDetailsController {
    private final ContactDetailsService contactDetailsService;

    @Autowired
    public ContactDetailsController(ContactDetailsService contactDetailsService) {
        this.contactDetailsService = contactDetailsService;
    }

    public Long saveConontact(ContactDetails contactDetails){
        contactDetailsService.saveContactDetails(contactDetails);
        return contactDetails.getId();
    }
}
