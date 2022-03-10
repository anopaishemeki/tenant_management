package com.cicosy.tenant_management.model.document_management;


import javax.persistence.*;






import java.time.LocalDate;



@Entity
@Table(name ="reply_documents")
public class ReplyDocuments{


    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
    private String companyName;
    private String addressLine1;
    private String addressLine3;
    private String addressLine2;


    
    
    private LocalDate today;
 
    private String shop_size;
    private String rent;
    private String deposit_fee;
    private String operation_cost;
    private String lease_term;
    private String fit_out_period;

    public String getShop_size() {
        return this.shop_size;
    }

    public void setShop_size(String shop_size) {
        this.shop_size = shop_size;
    }

    public String getRent() {
        return this.rent;
    }

    public void setRent(String rent) {
        this.rent = rent;
    }

    public String getDeposit_fee() {
        return this.deposit_fee;
    }

    public void setDeposit_fee(String deposit_fee) {
        this.deposit_fee = deposit_fee;
    }

    public String getOperation_cost() {
        return this.operation_cost;
    }

    public void setOperation_cost(String operation_cost) {
        this.operation_cost = operation_cost;
    }

    public String getLease_term() {
        return this.lease_term;
    }

    public void setLease_term(String lease_term) {
        this.lease_term = lease_term;
    }

    public String getFit_out_period() {
        return this.fit_out_period;
    }

    public void setFit_out_period(String fit_out_period) {
        this.fit_out_period = fit_out_period;
    }
    public String getAddressLine2() {
        return this.addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public ReplyDocuments(){

    }
    public ReplyDocuments(String companyName,String addressLine2, String shop_size,String addressLine1,String addressLine3,
     String rent,
     String deposit_fee,
     String operation_cost,
     String lease_term,
     String fit_out_period,LocalDate today){
        this.companyName=companyName;
        this.addressLine2=addressLine2;
        this.addressLine3=addressLine3;
        this.addressLine1=addressLine1;
        this.today=LocalDate.now();
        this.shop_size=shop_size;
        this.rent=rent;
        this.deposit_fee=deposit_fee;
        this.operation_cost=operation_cost;
        this.lease_term=lease_term;
        this.fit_out_period=fit_out_period;

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

    public String getAddressLine3() {
        return this.addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }

    public void setToday(LocalDate today) {
        this.today = LocalDate.now();
    }

}
