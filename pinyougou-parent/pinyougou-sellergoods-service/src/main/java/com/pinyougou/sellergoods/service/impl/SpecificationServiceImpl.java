package com.pinyougou.sellergoods.service.impl;
import java.util.List;
import java.util.Map;

import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import com.pinyougou.pojo.group.Specification;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbSpecificationMapper;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojo.TbSpecificationExample;
import com.pinyougou.pojo.TbSpecificationExample.Criteria;
import com.pinyougou.sellergoods.service.SpecificationService;

import entity.PageResult;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
public class SpecificationServiceImpl implements SpecificationService {

	@Autowired
	private TbSpecificationMapper specificationMapper;

	@Autowired
	private TbSpecificationOptionMapper specificationOptionMapper;
	
	/**
	 * 查询全部
	 */
	@Override
	public List<TbSpecification> findAll() {
		return specificationMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbSpecification> page=   (Page<TbSpecification>) specificationMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(TbSpecification specification) {
		specificationMapper.insert(specification);		
	}

	@Override
	public void addSpecAndOption(Specification specification) {

		specificationMapper.insert(specification.getSpecification());

		List<TbSpecificationOption> list = specification.getSpecificationOptionList();

		for (TbSpecificationOption tbSpecificationOption : list) {

			tbSpecificationOption.setSpecId(specification.getSpecification().getId());

			specificationOptionMapper.insertSelective(tbSpecificationOption);

		}

	}


	/**
	 * 修改
	 */
	@Override
	public void update(TbSpecification specification){
		specificationMapper.updateByPrimaryKey(specification);
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public TbSpecification findOne(Long id){
		return specificationMapper.selectByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for (Long id : ids) {

			specificationMapper.deleteByPrimaryKey(id);

			TbSpecificationOptionExample example = new TbSpecificationOptionExample();
			example.createCriteria().andSpecIdEqualTo(id);
			specificationOptionMapper.deleteByExample(example);

		}
	}
	
	
		@Override
	public PageResult findPage(TbSpecification specification, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbSpecificationExample example=new TbSpecificationExample();
		Criteria criteria = example.createCriteria();
		
		if(specification!=null){			
						if(specification.getSpecName()!=null && specification.getSpecName().length()>0){
				criteria.andSpecNameLike("%"+specification.getSpecName()+"%");
			}
	
		}
		
		Page<TbSpecification> page= (Page<TbSpecification>)specificationMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}

	@Override
	public Specification findfSpecAndOptionById(Long id) {


		TbSpecification tbSpecification = specificationMapper.selectByPrimaryKey(id);

		TbSpecificationOptionExample example = new TbSpecificationOptionExample();
		example.createCriteria().andSpecIdEqualTo(id);
		List<TbSpecificationOption> list = specificationOptionMapper.selectByExample(example);

		Specification specification = new Specification();
		specification.setSpecification(tbSpecification);
		specification.setSpecificationOptionList(list);



		return specification;
	}

	@Override
	public void updateSpecAndOption(Specification specification) {
		Long id = specification.getSpecification().getId();
		specificationMapper.updateByPrimaryKeySelective(specification.getSpecification());

		List<TbSpecificationOption> list = specification.getSpecificationOptionList();

		TbSpecificationOptionExample example = new TbSpecificationOptionExample();

		example.createCriteria().andSpecIdEqualTo(id);

		specificationOptionMapper.deleteByExample(example);


		for (TbSpecificationOption tbSpecificationOption : list) {

			tbSpecificationOption.setSpecId(id);

			specificationOptionMapper.insertSelective(tbSpecificationOption);


		}




	}

	@Override
	public List<Map> selectWithText() {
		return specificationMapper.selectOptionList();
	}

}
