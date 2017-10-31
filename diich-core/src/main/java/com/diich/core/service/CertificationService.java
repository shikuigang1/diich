package com.diich.core.service;

import java.util.List;
import java.util.Map;

/**
 * Created by wangwenjian on 2017/10/31.
 */
public interface CertificationService {

    List<Map> getCertifications(Integer pageNum, Integer pageSize) throws Exception;
}
