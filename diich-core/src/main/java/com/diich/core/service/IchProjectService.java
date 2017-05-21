package com.diich.core.service;

import com.diich.core.model.IchProject;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchProjectService {

    Map<String, Object> getIchProject(String id);

    void saveIchProject(IchProject ichProject) throws Exception;

    Map<String, Object> getIchProjectList(String text);
}
