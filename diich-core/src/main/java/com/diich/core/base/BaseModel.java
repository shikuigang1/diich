package com.diich.core.base;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@SuppressWarnings("serial")
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class BaseModel implements Serializable {
    private char dataStatus;

    public char getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(char dataStatus) {
        this.dataStatus = dataStatus;
    }

    public void setDefaultDataStatus() {
        this.dataStatus = (char)0;
    }

}
