package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryEntity {
    private Integer ivtid;
    private Integer whid;
    private Integer pid;
    private Integer available;
    private Integer waittodelivery;
}
