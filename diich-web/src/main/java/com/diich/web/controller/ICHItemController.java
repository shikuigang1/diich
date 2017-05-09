package com.diich.web.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.ICHItem;
import com.diich.core.support.HttpCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichItem")
public class ICHItemController extends BaseController<ICHItem> {

    @RequestMapping("selectICHItem")
    @ResponseBody
    public ResponseEntity<ModelMap> selectICHItem(HttpServletRequest request) {
        String ichItemId = request.getParameter("ichItemId");
        ModelMap map = new ModelMap();

        if(ichItemId == null || "".equals(ichItemId)) {
            return setModelMap(map, HttpCode.BAD_REQUEST);
        }

        ICHItem ichItem = null;

        return setSuccessModelMap(map, ichItem);
    }

    @RequestMapping("selectICHItemList")
    @ResponseBody
    public ResponseEntity<ModelMap> selectICHItemList(HttpServletRequest request) {
        ModelMap map = new ModelMap();

        Page<ICHItem> page = null;

        return setSuccessModelMap(map, page);
    }

    @RequestMapping("saveICHItem")
    @ResponseBody
    public ResponseEntity<ModelMap> saveICHItem(HttpServletRequest request) {
        String ichItemId = request.getParameter("ichItemId");
        ModelMap map = new ModelMap();

        if(ichItemId == null || "".equals(ichItemId)) {
            return setModelMap(map, HttpCode.BAD_REQUEST);
        }

        ICHItem ichItem = null;

        return setSuccessModelMap(map, ichItem);
    }
}
