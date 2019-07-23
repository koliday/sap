package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FiveYearConversionRateDataDTO {
    private Integer year;
    private Integer inq;
    private Integer ord;
    private BigDecimal rate;
}
