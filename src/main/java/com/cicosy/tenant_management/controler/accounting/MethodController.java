package com.cicosy.tenant_management.controler.accounting;

import com.cicosy.tenant_management.model.accounting.Method;
import com.cicosy.tenant_management.service.accounting.MethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/method")
public class MethodController {
    public MethodService methodService;

    @Autowired
    public MethodController(MethodService methodService) {
        this.methodService = methodService;
    }

    @PostMapping("/save-method")
    public Method saveMethod(@RequestBody Method method){
        return methodService.save(method);
    }

    @GetMapping("/get-methods")
    public List<Method> getMethods(){
        return methodService.getAll();
    }
}
