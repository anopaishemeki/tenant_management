package com.cicosy.tenant_management.service.document_management;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FileStorageProperties {

    private String uploadDir;



public String getUploadDir(){
    return this.uploadDir;
}



}
