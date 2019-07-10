package com.koliday.sap.dto;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InquiryItemDTO {

    private Integer inid;
    private Integer itemid;
    private String itemno;
    @JSONField(name="product_id")
    private Integer pid;
    private String pname;
    @JSONField(name="quantity")
    private Integer quantity;
    @JSONField(name="price")
    private BigDecimal price;
    @JSONField(name="net_value")
    private BigDecimal netvalue;
    @JSONField(name="prob")
    private BigDecimal probability;
    @JSONField(name="exp_profit")
    private BigDecimal expectprofit;


}
