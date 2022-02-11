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
                 int duration,
                 String terms

    ) {
        this.name = name;
        this.agreementDate = agreementDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration=duration;
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
                 String status,
                 int floorNumber,
                 int duration,
                 int rentalFee,
                 String terms

    ) {
        this.id=id;
        this.agreementDate = agreementDate;
        this.duration=duration;
        this.name = name;
        this.status=status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.floorNumber=floorNumber;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
        this.rentalFee = rentalFee;

        this.terms = terms;

    }



    public int getDuration() {
        return duration;
    }

    public String getStatus() {
        if (this.getEndDate().isBefore(LocalDate.now())){
            status="Expired";
        }else {
            status="Active";

        }
        return status;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getAgreementDate() {
        return agreementDate;
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
       endDate= this.startDate.plusMonths(this.duration);
        this.endDate = endDate;
    }

    public void setStatus(String status) {

        this.status = status;
    }
}
