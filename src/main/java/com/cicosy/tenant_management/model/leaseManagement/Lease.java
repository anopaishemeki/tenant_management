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

   // @JsonFormat(pattern = "yyyy-MM-dd" ,shape = JsonFormat.Shape.STRING)
   @JsonDeserialize(using = LocalDateDeserializer.class)
   @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;
    private String buildingName;
    private String buildingLocation;
    private String terms;
    private int duration;
    private LocalDate endDate;
    private int timeLeft;
    private String status;


    public Lease(String name,
                 LocalDate startDate,
                 LocalDate endDate,
                 String buildingName,
                 String buildingLocation,
                 String status,
                 int duration,
                 int timeLeft,
                 String terms

    ) {
        this.name = name;

        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.timeLeft=timeLeft;
        this.status = status;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
        this.terms = terms;

    }



    public Lease(Long id,
                 String name,

                 LocalDate startDate,
                 LocalDate endDate,
                 String buildingName,
                 int timeLeft,
                 String buildingLocation,
                 String status,
                 int duration,
                 String terms

    ) {
        this.id = id;
        this.duration = duration;
        this.timeLeft=timeLeft;
        this.name = name;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
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

    public int getTimeLeft() {
        return timeLeft;
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
        this.timeLeft = timeLeft;
    }

    public void setStatus(String status) {

        this.status = status;
    }
}
