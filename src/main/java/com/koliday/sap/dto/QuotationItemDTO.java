package com.koliday.sap.dto;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class QuotationItemDTO {

    @JSONField(name="itemid")
    private String itemid;

    @JSONField(name="discount")
    private BigDecimal discount;
    private Integer quid;

}
