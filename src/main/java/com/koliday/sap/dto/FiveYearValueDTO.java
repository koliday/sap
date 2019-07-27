package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FiveYearValueDTO {
    private Integer year;
    private BigDecimal value;
}
