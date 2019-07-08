package com.koliday.sap.service.intf;

import com.koliday.sap.entity.CallFreqEntity;
import com.koliday.sap.entity.DepartmentEntity;
import com.koliday.sap.entity.FuncEntity;
import com.koliday.sap.entity.VipEntity;

import java.util.List;

public interface LocalDataService {
    List<VipEntity> getVipList();

    List<DepartmentEntity> getDepList();

    List<CallFreqEntity> getCallFreqList();

    List<FuncEntity> getFuncList();
}
