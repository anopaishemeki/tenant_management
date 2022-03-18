package com.cicosy.tenant_management.model.maintenanceManagement;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
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
@JsonAutoDetect
public class MaintenanceRequests {

    @Id
    @SequenceGenerator(name = "maintenanceRequest_sequence", sequenceName = "maintenanceRequest_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "maintenanceRequest_sequence")
    private Long id;
    private String request;
    private String description;
    private String levelOfUrgency;
    private String tenantId;

    private LocalDate dateLogged = LocalDate.now();
    private LocalDate overdueDate = LocalDate.now().plusDays(7);

    private String status ;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_id" )
    private Schedule schedule;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLevelOfUrgency() {
        return levelOfUrgency;
    }

    public void setLevelOfUrgency(String levelOfUrgency) {
        this.levelOfUrgency = levelOfUrgency;
    }

    public LocalDate getDateLogged() {
        return dateLogged;
    }

    public void setDateLogged(LocalDate dateLogged) {
        this.dateLogged = dateLogged;
    }

    public LocalDate getOverdueDate() {
        return overdueDate;
    }

    public void setOverdueDate(LocalDate overdueDate) {
        this.overdueDate = overdueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }
}

