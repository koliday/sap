package com.koliday.sap.service.intf;

import com.koliday.sap.dto.InvoiceDTO;
import com.koliday.sap.dto.InvoiceDetailDTO;
import com.koliday.sap.dto.InvoicePreviewDetailDTO;
import com.koliday.sap.entity.InvoiceEntity;

import java.util.List;

public interface InvoiceService {
    Integer createInvoice(InvoiceEntity invoice);

    InvoiceDetailDTO displayInvoice(Integer ivid);

    List<InvoiceDTO> getAllInvoice(Integer creator);

    InvoicePreviewDetailDTO previewInvoice(Integer ivid);
}
