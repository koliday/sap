package com.koliday.sap.mapper;

import com.koliday.sap.dto.InvoiceDTO;
import com.koliday.sap.dto.InvoiceDetailDTO;
import com.koliday.sap.dto.InvoicePreviewDTO;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.InvoiceEntity;
import com.koliday.sap.entity.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceMapper {
    Integer createInvoice(@Param("invoice") InvoiceEntity invoice);

    Integer updateOrder(@Param("invoice") InvoiceEntity invoice);

    Integer selectInvoiceCount();

    InvoiceDTO displayInvoice(@Param("ivid")Integer ivid);

    List<InvoiceDTO> getAllInvoice(@Param("creator") Integer creator);

    InvoicePreviewDTO previewInvoice(@Param("ivid")Integer ivid);
}
