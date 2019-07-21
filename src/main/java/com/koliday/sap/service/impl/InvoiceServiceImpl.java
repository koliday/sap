package com.koliday.sap.service.impl;

import com.koliday.sap.controller.OrderManagementController;
import com.koliday.sap.dto.InvoiceDTO;
import com.koliday.sap.dto.InvoiceDetailDTO;
import com.koliday.sap.dto.InvoicePreviewDetailDTO;
import com.koliday.sap.dto.SalesOrderItemDTO;
import com.koliday.sap.entity.InvoiceEntity;
import com.koliday.sap.mapper.InvoiceMapper;
import com.koliday.sap.mapper.OrderMapper;
import com.koliday.sap.service.intf.InvoiceService;
import com.koliday.sap.utils.IdConvertToNoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Integer createInvoice(InvoiceEntity invoice) {
        Integer invoiceCount=invoiceMapper.selectInvoiceCount();
        String ivno= IdConvertToNoUtil.convertInvoice(invoiceCount+1);
        invoice.setIvno(ivno);
        Integer invoiceResult=invoiceMapper.createInvoice(invoice);
        if(invoiceResult<1)
            return 0;
        Integer ivid=invoice.getIvid();
        Integer updateinquirystatus=invoiceMapper.updateOrder(invoice);
        if(updateinquirystatus<1)
            return 0;
        return ivid;
    }


    @Override
    public InvoiceDetailDTO displayInvoice(Integer ivid) {
        InvoiceDetailDTO invoiceDetailDTO=new InvoiceDetailDTO();
        invoiceDetailDTO.setInvoiceDTO(invoiceMapper.displayInvoice(ivid));
        invoiceDetailDTO.setSalesOrderItemDTOList(orderMapper.getSalesOrderItem(invoiceDetailDTO.getInvoiceDTO().getOrid()));
        return invoiceDetailDTO;
    }

    @Override
    public List<InvoiceDTO> getAllInvoice(Integer creator) {
        return invoiceMapper.getAllInvoice(creator);
    }

    @Override
    public InvoicePreviewDetailDTO previewInvoice(Integer ivid) {
        InvoicePreviewDetailDTO invoicePreviewDetailDTO=new InvoicePreviewDetailDTO();
        invoicePreviewDetailDTO.setInv(invoiceMapper.previewInvoice(ivid));
        invoicePreviewDetailDTO.setItemlist(orderMapper.getSalesOrderItem(invoicePreviewDetailDTO.getInv().getOrid()));
        for(SalesOrderItemDTO salesOrderItemDTO:invoicePreviewDetailDTO.getItemlist()){
            BigDecimal finalvalue=(salesOrderItemDTO.getNetvalue().subtract(salesOrderItemDTO.getDiscount()).multiply(new BigDecimal(1).subtract(salesOrderItemDTO.getOrderdiscount().divide(new BigDecimal(100))))).setScale(2,BigDecimal.ROUND_HALF_UP);
            salesOrderItemDTO.setFinalvalue(finalvalue);
        }
        return invoicePreviewDetailDTO;
    }
}
