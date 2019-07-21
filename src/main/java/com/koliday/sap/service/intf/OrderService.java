package com.koliday.sap.service.intf;

import com.koliday.sap.dto.*;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.QuotationEntity;
import com.koliday.sap.entity.SalesOrderEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    //inquiry
    Integer createInquiry(InquiryEntity inquiry, List<InquiryItemDTO> inquiryItemDTOList);

    List<InquiryDTO> getAllInquiry(Integer creator);

    InquiryDetailDTO getInquiryDetail(Integer inid);

    //quotation
    List<InquiryDTO> getQuotationRefInquiry(Integer uid);

    Integer createQuotation(QuotationEntity quotationEntity, List<QuotationItemDTO> quotationItemDTOList);

    List<QuotationDTO> getAllQuotation(Integer creator);

    QuotationDetailDTO getQuotationDetail(Integer quid);

    //salesorder
    List<QuotationDTO> getSalesOrderRefQuotation(Integer creator);

    Integer createSalesOrder(SalesOrderEntity salesOrderEntity);

    List<SalesOrderDTO> getAllSalesOrder(Integer creator);

    List<SalesOrderDTO> getDeliveryRef(Integer creator);

    SalesOrderDetailDTO getSalesOrderDetail(Integer orid);

    List<SalesOrderDTO> getUninvoicedOrder(Integer creator);
}
