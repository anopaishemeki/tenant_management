package com.cicosy.tenant_management.service.accounting;

import com.cicosy.tenant_management.model.accounting.Method;
import com.cicosy.tenant_management.repository.accounting.MethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MethodService {
    private final MethodRepository methodRepository;

    @Autowired
    public MethodService(MethodRepository methodRepository) {
        this.methodRepository = methodRepository;
    }

    public Method save(Method method){
        methodRepository.save(method);
        return methodRepository.findById(method.getId()).orElseThrow(() -> new  IllegalStateException ("Saving Failed"));
    }

    public List<Method> getAll(){
        return methodRepository.findAll();
    }
}
