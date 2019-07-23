package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class MonthlyPerformanceDTO {
    private Integer order_quantity;
    private BigDecimal conversion_rate;
    private BigDecimal total_revenue;
    private BigDecimal total_profit;
    private Integer new_client_quantity;
    private Integer okr;
}
