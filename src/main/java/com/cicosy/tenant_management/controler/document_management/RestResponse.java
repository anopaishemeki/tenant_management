package com.cicosy.tenant_management.controler.document_management;

public class RestResponse {
	
    public static final String NOT_FOUND = "Not found";
    public static final String OK = "Ok";
    
    private String responseStatus;
    private Object response;
    
    public String getResponseStatus() {
        return responseStatus;
    }
    public void setResponseStatus(String responseStatus) {
        this.responseStatus = responseStatus;
    }
    public Object getResponse() {
        return response;
    }
    public void setResponse(Object response) {
        this.response = response;
    }
}