package com.cicosy.tenant_management.model.leaseManagement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table
public class Lease {
    @Id
    @SequenceGenerator(
            name="lease_sequence",
            sequenceName = "lease_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "lease_sequence"
    )
    private Long id;
    private String name;
    private LocalDate agreementDate;
    private LocalDate startDate;
    private String buildingName;
    private String buildingLocation;
    private int rentalFee;
    private int floorNumber;
    private String terms;
    @Transient
    private int duration;
    private LocalDate endDate;
    private String status;


    public Lease(String name,
                 LocalDate agreementDate, LocalDate startDate,
                 LocalDate endDate,
                 String buildingName,
                 String buildingLocation,
                 int floorNumber,
                 int rentalFee,
                 String status,
                 String terms

    ) {
        this.name = name;
        this.agreementDate = agreementDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status=status;
        this.floorNumber=floorNumber;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
        this.rentalFee = rentalFee;

        this.terms = terms;

    }
    public Lease(Long id,
                 String name,
                 LocalDate agreementDate,
                 LocalDate startDate,
                 LocalDate endDate,
                 String buildingName,
                 String buildingLocation,
                 int floorNumber,
                 String status,
                 int rentalFee,
                 String terms

    ) {
        this.id=id;
        this.agreementDate = agreementDate;
        this.status=status;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.floorNumber=floorNumber;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
        this.rentalFee = rentalFee;

        this.terms = terms;

    }



    public int getDuration() {
        return Period.between(this.startDate,this.endDate).getYears();
    }

    public String getStatus() {

        return status;
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

    public int getRentalFee() {
        return rentalFee;
    }

    public int getFloorNumber() {
        return floorNumber;
    }

    public String getTerms() {
        return terms;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public void setBuildingLocation(String buildingLocation) {
        this.buildingLocation = buildingLocation;
    }

    public void setRentalFee(int rentalFee) {
        this.rentalFee = rentalFee;
    }

    public void setFloorNumber(int floorNumber) {
        this.floorNumber = floorNumber;
    }

    public void setTerms(String terms) {
        this.terms = terms;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setStatus(String status) {

        this.status = status;
    }
}
