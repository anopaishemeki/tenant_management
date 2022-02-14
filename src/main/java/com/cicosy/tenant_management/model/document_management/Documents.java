/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cicosy.tenant_management.model.document_management;


import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
public class Documents implements Serializable
{

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

  private String name;

  private String type;

  @Lob
  private byte[] data;

  public Documents() {
  }

  public Documents(String name, String type, byte[] data) {
    this.name = name;
    this.type = type;
    this.data = data;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public byte[] getData() {
    return data;
  }

  public void setData(byte[] data) {
    this.data = data;
  }

}

    

