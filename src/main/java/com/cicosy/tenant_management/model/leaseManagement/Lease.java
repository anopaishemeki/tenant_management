package com.cicosy.tenant_management.model.leaseManagement;

import com.cicosy.tenant_management.model.tenantManagement.Tenant;
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
import java.util.List;


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
    private int tenant_id;

   // @JsonFormat(pattern = "yyyy-MM-dd" ,shape = JsonFormat.Shape.STRING)
   @JsonDeserialize(using = LocalDateDeserializer.class)
   @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate startDate;
    private String terms;
    private int duration;
    private LocalDate endDate;
    private int timeLeft;
    private String status;


    @Transient
    private Tenant tenant;

    public Lease(int tenant_id,
                 LocalDate startDate,
                 LocalDate endDate,
                 String status,
                 int duration,
                 int timeLeft,
                 String terms

    ) {
        this.tenant_id=tenant_id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.timeLeft=timeLeft;
        this.status = status;

        this.terms = terms;

    }



    public Lease(Long id,
                 int tenant_id,
                 LocalDate startDate,
                 LocalDate endDate,
                 int timeLeft,
                 String status,
                 int duration,
                 String terms

    ) {
        this.id = id;
        this.tenant_id=tenant_id;
        this.duration = duration;
        this.timeLeft=timeLeft;

        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.terms = terms;

    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
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





    public LocalDate getStartDate() {
        return startDate;
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



    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
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

    public int getTenant_id() {
        return tenant_id;
    }

    public void setTenant_id(int tenant_id) {
        this.tenant_id = tenant_id;
    }
}
