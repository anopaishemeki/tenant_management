/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;


import lombok.*;
import javax.persistence.*;


/**
 *
 * @author Dejong
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name="tenantDocuments")
public class TenantDocuments  {
    @Id
    @SequenceGenerator(
            name = "leaseDocuments_sequence",
            sequenceName = "leaseDocuments_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "leaseDocuments_sequence"
    )
    private Long id;

    private String application_letter;
    private String  cr14_form;
    private String cr6_form;
    private String certificate_of_incorporation;
    private String director_id;
    private String bank_statement;
    private String vat_reg;
    private String tax_clearance;
    private String article_of_association;

  


    public TenantDocuments(String application_letter, String cr14_form,String cr6_form,
    String certificate_of_incorporation,String director_id,String bank_statement,String vat_reg,String tax_clearance,String article_of_association) {
        this.application_letter=application_letter;
        this.cr14_form=cr14_form;
        this.cr6_form=cr6_form;
        this.certificate_of_incorporation=certificate_of_incorporation;
        this.director_id=director_id;
        this.vat_reg=vat_reg;
        this.tax_clearance=tax_clearance;
        this.article_of_association=article_of_association;
        this.bank_statement=bank_statement;

    }

    public TenantDocuments(){
        
    }
    public TenantDocuments(String application_letter){
        this.application_letter=application_letter;
    }
    public void setCr14(String cr14_form){
        this.cr14_form=cr14_form;
    }
     public void setCr6(String cr6_form){
        this.cr6_form=cr6_form;
    }
     public void setVat(String vat_reg){
        this.vat_reg=vat_reg;
    }
     public void setArticle(String article_of_association){
        this.article_of_association=article_of_association;
    }
     public void setTax(String tax_clearance){
        this.tax_clearance=tax_clearance;
    }
     public void setDirector(String director_id){
        this.director_id=director_id;
    }
     public void setCertificate(String certificate_of_incorporation){
        this.certificate_of_incorporation=certificate_of_incorporation;
    }
     public void setBankStatement(String bank_statement){
        this.bank_statement=bank_statement;
     } 
    
    public String getCr14(){
        return this.cr14_form;
    }
     public String getCr6(){
        return this.cr6_form;
    }
     public String getVat(){
        return this.vat_reg;
    }
     public String getArticle(){
       return  this.article_of_association;
    }
     public String getTax(){
        return this.tax_clearance;
    }
     public String getDirector(){
        return this.director_id;
    }
     public String getCertificate(){
        return this.certificate_of_incorporation;
    }
     public String getBankStatement(){
        return this.bank_statement;
     } 
     public String getApplication(){
         return this.application_letter;
     }   
     public Long getId(){
         return this.id;
     }


   
    
}
