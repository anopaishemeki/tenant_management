package com.cicosy.tenant_management.model.tenantManagement;


import com.cicosy.tenant_management.model.propertyManagement.Compartment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tenant {
    @Id

    @SequenceGenerator(
            name = "tenant_sequence",
            sequenceName = "tenant_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "tenant_sequence"
    )
    private Long id;
    private String name;
    private  String surname;
    private LocalDate register_Date=LocalDate.now();
    private String email;
    private String phone;
    private String id_passport;
    private String rentStatus;

    private String address;

    private String city;
    private String country;
    private String business_name;
    private String business_type;
    private String services;
    private String property;

    private String b_phone;
    private String b_email;
    private String b_tel;
    private String website;


  @Transient
  private List<Compartment> compartmentObjectlist;

    public Tenant(String name, String surname, String email, String phone,
                  String id_passport, String property, String rentStatus, List<Compartment> compartmentObjectlist) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.id_passport = id_passport;
        this.property = property;
        this.rentStatus = rentStatus;
        this.compartmentObjectlist = compartmentObjectlist;

    }

    public List<Compartment> getCompartmentObjectlist() {
        return compartmentObjectlist;
    }

    public void setCompartmentObjectlist(List<Compartment> compartmentObjectlist) {
        this.compartmentObjectlist = compartmentObjectlist;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public LocalDate getRegister_Date() {
        return register_Date;
    }

    public void setRegister_Date(LocalDate register_Date) {
        this.register_Date = register_Date;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getId_passport() {
        return id_passport;
    }

    public void setId_passport(String id_passport) {
        this.id_passport = id_passport;
    }

    public String getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(String rentStatus) {
        this.rentStatus = rentStatus;
    }


    public String getAddress() {
        return address;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getB_phone() {
        return b_phone;
    }

    public void setB_phone(String b_phone) {
        this.b_phone = b_phone;
    }

    public String getB_email() {
        return b_email;
    }

    public void setB_email(String b_email) {
        this.b_email = b_email;
    }

    public String getB_tel() {
        return b_tel;
    }

    public void setB_tel(String b_tel) {
        this.b_tel = b_tel;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getBusiness_name() {
        return business_name;
    }

    public void setBusiness_name(String business_name) {
        this.business_name = business_name;
    }

    public String getBusiness_type() {
        return business_type;
    }

    public void setBusiness_type(String business_type) {
        this.business_type = business_type;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }


    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }
}
