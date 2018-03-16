package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/7/23.
 */
public class IchObject extends BaseModel{

    private Long targetId;
    private int targetType;
    protected List<ContentFragment> contentFragmentList;

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }

    public void addContentFragment(ContentFragment contentFragment) {
        if(contentFragmentList == null ) {
            contentFragmentList = new ArrayList<>();
        }

        Long attributeId = contentFragment.getAttributeId();
        for (int i = 0; i < contentFragmentList.size(); i++) {
            ContentFragment contentFragment2 = contentFragmentList.get(i);
            if(attributeId != null && attributeId.equals(contentFragment2.getAttributeId())) {
                contentFragmentList.remove(contentFragment2);
                i--;
            }
        }

        contentFragmentList.add(contentFragment);
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public int getTargetType() {
        return targetType;
    }

    public void setTargetType(int targetType) {
        this.targetType = targetType;
    }


    public static void main(String[] args) {
        Integer i1 = 20;
        Integer i2 = 20;

        System.out.println(i1 == i2);
    }
}
