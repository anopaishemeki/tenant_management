package com.cicosy.tenant_management.model.document_management;
import javax.persistence.*;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;



import java.time.LocalDate;



@Entity
@Table(name ="expiredLease_details")
public class ExpiredLeaseDocuments{


    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
    private String companyName;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;

  
    
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate expiryDate;
    private String debit;
    private LocalDate today;
 
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate dueDate;
    private String signature;

    public ExpiredLeaseDocuments(){

    }
    public ExpiredLeaseDocuments(String addressLine2,String companyName,String addressLine1,String addressLine3,LocalDate expiryDate ,String debit,LocalDate dueDate, String signature,LocalDate today){
        this.companyName=companyName;
        this.addressLine1=addressLine1;
        this.addressLine2=addressLine2;
        this.addressLine3=addressLine3;
        this.expiryDate=expiryDate;
        this.today=LocalDate.now();
        this.dueDate=dueDate;
        this.debit=debit;
        this.signature=signature;

    }
    public String getAddressLine3() {
        return this.addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }
    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddressLine1() {
        return this.addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return this.addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public LocalDate getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getDebit() {
        return this.debit;
    }

    public void setDebit(String debit) {
        this.debit = debit;
    }

    public LocalDate getToday() {
        return this.today;
    }

    public void setToday(LocalDate today) {
        this.today = LocalDate.now();
    }

    public LocalDate getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getSignature() {
        return this.signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }






}
