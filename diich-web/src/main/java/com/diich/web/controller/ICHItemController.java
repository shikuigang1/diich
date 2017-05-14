package com.diich.web.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.ICHItem;
import com.diich.core.service.ICHItemService;
import com.diich.core.support.HttpCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichItem")
public class ICHItemController extends BaseController<ICHItem> {

    @Autowired
    private ICHItemService ichItemService;

    @RequestMapping("getICHItem")
    @ResponseBody
    public Map<String, Object> getICHItem(HttpServletRequest request) {
        String ichItemId = request.getParameter("params");

        Map<String, Object> result = ichItemService.getICHItem(ichItemId);

        return result;
    }

    @RequestMapping("getICHItemList")
    @ResponseBody
    public Map<String, Object> getICHItemList(HttpServletRequest request) {
        String params = request.getParameter("params");

        Map<String, Object> result = ichItemService.getICHItemList(params);

        return result;
    }

    @RequestMapping("saveICHItem")
    @ResponseBody
    public Map<String, Object> saveICHItem(HttpServletRequest request) {
        String ichItem = request.getParameter("params");

        Map<String, Object> result = ichItemService.saveICHItem(ichItem);

        return result;
    }
}
