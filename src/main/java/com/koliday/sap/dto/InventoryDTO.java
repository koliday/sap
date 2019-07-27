package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InventoryDTO {
    private Integer ivtid;
    private Integer whid;
    private Integer pid;
    private String pname;
    private String pno;
    private BigDecimal price;
    private BigDecimal cost;
    private Integer available;
    private Integer waittodelivery;
}
