package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class ItemEntity {
    private Integer itemid;
    private String itemno;
    private Integer pid;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal netvalue;
    private BigDecimal probability;
    private BigDecimal expectprofit;
    private BigDecimal netdiscount;
    private BigDecimal itemdiscount;
    private Integer plantid;
    private Integer whid;
    private Integer pickstatus;
    private Date pickdate;
    private Integer pickquantity;
    private Integer inid;
    private Integer quid;
    private Integer orid;
    private Integer deid;
}
