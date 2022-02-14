package com.cicosy.tenant_management.model.maintenanceManagement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

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

    private LocalDate dateLogged = LocalDate.now();
    private LocalDate overdueDate = LocalDate.now().plusDays(7);

    private String status ;



    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_id")
    private Schedule schedule;





}
