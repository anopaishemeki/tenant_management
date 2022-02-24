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



@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonAutoDetect
@Entity()
@Table()
public class Lease {
    @Id
    @SequenceGenerator(
            name = "lease_sequence",
            sequenceName = "lease_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "lease_sequence"
    )
    private Long id;
    private String name;

//    @JsonFormat(pattern = "yyyy-MM-dd" ,shape = JsonFormat.Shape.STRING)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate agreementDate;

   // @JsonFormat(pattern = "yyyy-MM-dd" ,shape = JsonFormat.Shape.STRING)
   @JsonDeserialize(using = LocalDateDeserializer.class)
   @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;
    private String buildingName;
    private String buildingLocation;
    private int rentalFee;
    private int floorNumber;
    private String terms;
    private String email;
    private String phone;
    private int duration;
    private LocalDate endDate;
    private int timeLeft;

    private String status;


    public Lease(String name,
                 LocalDate agreementDate, LocalDate startDate,
                 LocalDate endDate,
                 String buildingName,
                 String buildingLocation,
                 int floorNumber,
                 int rentalFee,
                 String status,
                 String email,
                 String phone,
                 int duration,
                 int timeLeft,
                 String terms

    ) {
        this.name = name;
        this.agreementDate = agreementDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.timeLeft=timeLeft;
        this.status = status;
        this.email=email;
        this.phone=phone;
        this.floorNumber = floorNumber;
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
                 int timeLeft,
                 String buildingLocation,
                 String status,
                 String email,
                 String phone,
                 int floorNumber,
                 int duration,
                 int rentalFee,
                 String terms

    ) {
        this.id = id;
        this.agreementDate = agreementDate;
        this.duration = duration;
        this.timeLeft=timeLeft;
        this.name = name;
        this.email=email;
        this.phone=phone;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.floorNumber = floorNumber;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
        this.rentalFee = rentalFee;

        this.terms = terms;

    }




    public int getDuration() {
        return duration;
    }

    public String getStatus() {
//        if (this.getEndDate().isBefore(LocalDate.now())){
//            status="Expired";
//        }else {
//            status="Active";

//        }
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

    public int getTimeLeft() {
        return timeLeft;
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
        endDate = this.startDate.plusMonths(this.duration);
        this.endDate = endDate;
    }

    public void setTimeLeft(int timeLeft) {
//        timeLeft=Period.between(LocalDate.now(),this.endDate).getDays();
        this.timeLeft = timeLeft;
    }

    public void setStatus(String status) {

        this.status = status;
    }
}
