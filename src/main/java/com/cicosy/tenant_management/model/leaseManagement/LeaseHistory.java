package com.cicosy.tenant_management.model.leaseManagement;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect
@ToString
@Entity
@Table
public class LeaseHistory {
    @Id
    @SequenceGenerator(
            name="leaseHistory_sequence",
            sequenceName = "leaseHistory_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "leaseHistory_sequence"
    )
    private Long id;
    private int lease_id;
    private int tenant_id;
    private String name;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;
    private String buildingName;
    private String buildingLocation;
    private String terms;
    @Transient
    private int duration;
    private LocalDate endDate;

    private String action;
    private LocalDateTime actionDate;

    public void setAction(String action) {
        this.action = action;
    }

    public void setTenant_id(int tenant_id) {
        this.tenant_id = tenant_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public void setBuildingLocation(String buildingLocation) {
        this.buildingLocation = buildingLocation;
    }



    public void setTerms(String terms) {
        this.terms = terms;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }


    public void setActionDate(LocalDateTime actionDate) {
        this.actionDate = actionDate;
    }

    public Long getId() {
        return id;
    }

    public int getTenant_id() {
        return tenant_id;
    }

    public String getName() {
        return name;
    }



    public LocalDate getStartDate() {
        return startDate;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public String getBuildingLocation() {
        return buildingLocation;
    }


    public String getTerms() {
        return terms;
    }

    public int getDuration() {
        return duration;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getAction() {
        return action;
    }

    public LocalDateTime getActionDate() {
        return actionDate;
    }

    public int getLease_id() {
        return lease_id;
    }

    public void setLease_id(int lease_id) {
        this.lease_id = lease_id;
    }
}
