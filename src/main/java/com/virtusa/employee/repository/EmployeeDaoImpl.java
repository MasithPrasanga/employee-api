package com.virtusa.employee.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.virtusa.employee.entity.Employee;

public class EmployeeDaoImpl implements EmployeeDao {
	
	private static Map<Integer,Employee> employeeMap = new HashMap<Integer,Employee>();
	
	static {
		
		Employee employee1 = new Employee(1,"James","Gosling",6945465);
		Employee employee2 = new Employee(2,"Rod","Johnson",50000);
		
		employeeMap.put(1,employee1);
		employeeMap.put(2,employee2);
		
	}

	@Override
	public void insert(Employee employee) {
		employee.setId(getMaxId()+1);
		employeeMap.put(employee.getId(), employee);
		
	}

	@Override
	public Employee read(int id) {
		return  employeeMap.get(id);
	}

	@Override
	public List<Employee> readAll() {
		List<Employee> employeeList = new ArrayList<Employee>(employeeMap.values());
		return employeeList;
	}

	@Override
	public void update(Employee employee) {
		employeeMap.put(employee.getId(),employee);
	}

	@Override
	public void delete(Employee employee) {
		employeeMap.remove(employee.getId());
	}
	
	public static int getMaxId() {
		int max = 0;
		for (int id : employeeMap.keySet()) {
			if (max <= id)
				max = id;
		}
		return max;
	}
}
