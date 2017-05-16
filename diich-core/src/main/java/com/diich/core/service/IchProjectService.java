package com.diich.core.service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchProjectService {

    Map<String, Object> getIchProject(String id);

    Map<String, Object> saveIchProject(String text);

    Map<String, Object> getIchProjectList(String text);
}
