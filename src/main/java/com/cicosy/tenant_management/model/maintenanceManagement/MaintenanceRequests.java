package com.cicosy.tenant_management.model.maintenanceManagement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequests {

    @Id
    @SequenceGenerator(name = "property_sequence", sequenceName = "maintenanceRequest_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "maintenanceRequest_sequence")
    private Long id;
    private String request;
    private String description;
    private String levelOfUrgency;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateLogged = new Date(System.currentTimeMillis());
    @Column(columnDefinition = "varchar(255) default 'Pending'")
    private String status;
    private String maintenanceDate = "Pending";






}
