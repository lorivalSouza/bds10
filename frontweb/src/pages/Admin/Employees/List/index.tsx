import './styles.css';

import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import { Employee } from 'types/employee';
import { SpringPage } from 'types/vendor/spring';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

//const employeeHardCode = { // delete
//id: 1,
// name: "Carlos",
// email: "carlos@gmail.com",
// department: {
//  id: 1,
//  name: "Sales"
//}
//};





     // <EmployeeCard employee={employeeHardCode} />
     // <EmployeeCard employee={employeeHardCode} />
     // <EmployeeCard employee={employeeHardCode} />
     // <EmployeeCard employee={employeeHardCode} />


type ControlComponetsData = {
  activePage: number;
};

const List = () => {

  const [page, setPage] = useState<SpringPage<Employee>>();

  const [controlComponetsData, setControlComponetsData] =
    useState<ControlComponetsData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponetsData({
      activePage: pageNumber,
    });
  };

  const getEmployees = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/employees',
      withCredentials: true,
      params: {
        page: controlComponetsData.activePage,
        size: 3,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponetsData]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);




  return (
    <>
      {hasAnyRoles(['ROLE_ADMIN']) && (
        <Link to="/admin/employees/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
      )}

      
        {page?.content.map((employee) => (
          <div key={employee.id} className="col-sm-6 col-md-12">
            <EmployeeCard employee={employee} />
          </div>
        ))}
    

      <Pagination
        forcePage={0}
        pageCount={1}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
