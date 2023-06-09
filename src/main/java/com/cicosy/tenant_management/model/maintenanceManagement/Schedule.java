package com.cicosy.tenant_management.model.maintenanceManagement;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
//    @JsonDeserialize(using = LocalDateDeserializer.class)
//    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate scheduleDate ;
    private String team;

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Long getId() {
//        if (scheduleDate.isBefore(LocalDate.now())) {
//            setId(null);
//        }
            return Id;
    }

    public void setId(Long id) {
        this.Id = id;
    }

    public LocalDate getScheduleDate() {

        if (scheduleDate.isBefore(LocalDate.now())) {
            setScheduleDate(null);
        }
        return scheduleDate;
    }

    public void setScheduleDate(LocalDate scheduleDate) {


        this.scheduleDate = scheduleDate;
    }
}
