package com.koliday.sap.dto;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DeliveryItemDTO {

    @JSONField(name="itemid")
    private Integer itemid;
    @JSONField(name="item_id")
    private String item_id;
    @JSONField(name="whid")
    private Integer whid;
    private String itemno;
    private String pname;
    private Integer quantity;
    private Integer deid;
    private String plant;
    private String warehouse;

}
