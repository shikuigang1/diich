package com.diich.core.service;

import com.diich.core.model.ICHItem;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface ICHItemService {

    Map<String, Object> getICHItem(String id);

    Map<String, Object> saveICHItem(String text);

    Map<String, Object> getICHItemList(String text);
}
