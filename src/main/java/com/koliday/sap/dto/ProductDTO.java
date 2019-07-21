package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {
    private Integer pid;
    private String pno;
    private String pname;
    private BigDecimal price;
    private BigDecimal cost;
    private BigDecimal weight;
}
