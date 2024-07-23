import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../actions/employeeActions';

const EmployeeTable = ({ employees }) => {

  const dispatch = useDispatch();
  //const employees = useSelector ( state => state.employeeData.employees);
  /* const employee = useSelector( state => 
        state.employeeData.employees.find( emp => emp.id === parseInt(id))
  );//guarda el empleado que coincide con el id del url
 */
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
    
  if ( employees.length === 0 ){
    return <div>No hay empleados</div>
}

  //eliminar un empleado
  const handleDelete = (id) => {
      if(window.confirm('Seguro que quieres eliminar el empleado?')){
          dispatch(deleteEmployee(id));
          //navigate('/');
          //despues de eliminar vuelve a la pantalla principal
      }
  };


  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            {/* le agrego la funcionalidad para que sea clickeable
            en este caso unicamente en el id */}
            <td>
                <Link 
                    to={`/employees/${employee.id}`}
                    /* agrego el id a la direccion url
                     para poder obtener por ahí el id */
                >
                    {employee.id}
                </Link>
            </td>
            <td>
                <Link 
                    to={`/employees/${employee.id}`}
                    /* agrego el id a la direccion url
                     para poder obtener por ahí el id */
                >
                    {employee.firstName}
                </Link>
            </td>
            <td>
                <Link 
                    to={`/employees/${employee.id}`}
                    /* agrego el id a la direccion url
                     para poder obtener por ahí el id */
                >
                    {employee.lastName}
                </Link>
            </td>
            <td>
              <button onClick={() => handleDelete(employee.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
