package com.cicosy.tenant_management.service.maintenanceManagement;

import com.cicosy.tenant_management.model.maintenanceManagement.AttendedRequest;
import com.cicosy.tenant_management.repository.maintenaceManagement.AttendedRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendedRequestService {

    @Autowired
    private AttendedRequestRepo attendedRequestRepo;

    public List<AttendedRequest> getAll(){
        return attendedRequestRepo.findAll();
    }
}
