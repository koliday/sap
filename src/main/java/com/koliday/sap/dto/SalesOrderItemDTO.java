package com.koliday.sap.dto;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SalesOrderItemDTO {

    @JSONField(name="itemid")
    private String itemid;
    @JSONField(name="item_id")
    private String item_id;
    private String itemno;
    private String pname;
    private String pno;
    private Integer pid;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal netvalue;
    @JSONField(name="discount")
    private BigDecimal discount;
    private BigDecimal orderdiscount;
    private Integer quid;
    private BigDecimal finalvalue;
}
