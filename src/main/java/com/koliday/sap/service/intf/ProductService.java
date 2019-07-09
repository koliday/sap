package com.koliday.sap.service.intf;

import com.koliday.sap.entity.ProductEntity;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    BigDecimal getPriceByPid(Integer pid);

    List<ProductEntity> getAllProduct();
}
