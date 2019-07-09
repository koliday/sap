package com.koliday.sap.service.impl;

import com.koliday.sap.entity.ProductEntity;
import com.koliday.sap.mapper.ProductMapper;
import com.koliday.sap.service.intf.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;
    @Override
    public BigDecimal getPriceByPid(Integer pid) {
        return productMapper.getPriceByPid(pid);
    }

    @Override
    public List<ProductEntity> getAllProduct() {
        return productMapper.getAllProduct();
    }
}
