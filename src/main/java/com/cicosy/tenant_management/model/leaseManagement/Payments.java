package com.cicosy.tenant_management.model.leaseManagement;

import com.cicosy.tenant_management.model.leaseManagement.Lease;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Payments {
    @Id
    @SequenceGenerator(
            name="payments_sequence",
            sequenceName = "payments_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "payments_sequence"
    )
    private Long id;

    private LocalDate paymentDate;
    private String buildingName;
    private String buildingLocation;
    private int amount;
    private String paymentMethod;
    private Long lease_id;



    public Payments(LocalDate paymentDate, Long lease_id,String buildingName, String buildingLocation, int amount, String paymentMethod) {
        this.paymentDate = paymentDate;
        this.lease_id=lease_id;
        this.buildingName = buildingName;
        this.buildingLocation = buildingLocation;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }


    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public String getBuildingLocation() {
        return buildingLocation;
    }

    public int getAmount() {
        return amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public void setBuildingLocation(String buildingLocation) {
        this.buildingLocation = buildingLocation;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getLease_id() {
        return lease_id;
    }

    public void setLease_id(Long lease_id) {
        this.lease_id = lease_id;
    }
}
