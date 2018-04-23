package com.sojo.base.mapper;

import com.sojo.base.pojo.MesUserInfo;
import com.sojo.base.pojo.MesUserinfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface MesUserinfoMapper {
    long countByExample(MesUserinfoExample example);

    int deleteByExample(MesUserinfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(MesUserInfo record);

    int insertSelective(MesUserInfo record);

    List<MesUserInfo> selectByExample(MesUserinfoExample example);

    MesUserInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") MesUserInfo record, @Param("example") MesUserinfoExample example);

    int updateByExample(@Param("record") MesUserInfo record, @Param("example") MesUserinfoExample example);

    int updateByPrimaryKeySelective(MesUserInfo record);

    int updateByPrimaryKey(MesUserInfo record);
}