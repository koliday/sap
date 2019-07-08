package com.koliday.sap.service.impl;

import com.koliday.sap.entity.CallFreqEntity;
import com.koliday.sap.entity.DepartmentEntity;
import com.koliday.sap.entity.FuncEntity;
import com.koliday.sap.entity.VipEntity;
import com.koliday.sap.mapper.CallFreqMapper;
import com.koliday.sap.mapper.DepartmentMapper;
import com.koliday.sap.mapper.FuncMapper;
import com.koliday.sap.mapper.VipMapper;
import com.koliday.sap.service.intf.LocalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalDataServiceImpl implements LocalDataService {
    @Autowired
    private CallFreqMapper callFreqMapper;
    @Autowired
    private VipMapper vipMapper;
    @Autowired
    private DepartmentMapper departmentMapper;
    @Autowired
    private FuncMapper funcMapper;
    @Override
    public List<VipEntity> getVipList() {
        return vipMapper.getVipList();
    }

    @Override
    public List<DepartmentEntity> getDepList() {
        return departmentMapper.getDepList();
    }

    @Override
    public List<CallFreqEntity> getCallFreqList() {
        return callFreqMapper.getCallFreqList();
    }

    @Override
    public List<FuncEntity> getFuncList() {
        return funcMapper.getFuncList();
    }
}
