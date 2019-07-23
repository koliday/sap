package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FiveYearConversionRateDTO {
    private int[] year;
    private Object[][] data;
}
