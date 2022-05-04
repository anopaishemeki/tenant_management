package com.cicosy.tenant_management.service;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TenantApplicationController {

    @GetMapping("/index")
    public String home(){
        return "index";
    }

}
