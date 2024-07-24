import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from '../reducers/employeeSlice';
import { Link } from 'react-router-dom';
import '../index.css';
import ReactPaginate from "react-paginate";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employeeData.employees);
    //guarda la lista de empleados

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDeleteClick = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
            dispatch(deleteEmployee(id));
        }
    };

    //PARA PAGINACION   
    const [pageNumber, setPageNumber] = useState(0);
    const employeesPerPage = 5;
    const pagesVisited = pageNumber * employeesPerPage;

    //PARA ORDENAR
    const [ sortField, setSortField ] = useState(null);
    const [ sortDirection, setSortDirection ] = useState('asc');

    //PARA BUSCAR
    const [ searchTerm, setSearchTerm ] = useState('');

    //PARA PAGINACION 
    const pageCount = Math.ceil(employees.length / employeesPerPage);//total de páginas necesarias redondeando para arriba
    const changePage = ({ selected }) => {
        setPageNumber(selected);//actualiza la página seleccionada
    };

    //PARA ORDENAR- recibe Nombre o Apellido
    const handleSort = (field) => {
        const newSortDirection = 
            sortField === field &&
            sortDirection === 'asc' ? 'desc' : 'asc'
        //actualiza el campo y la direccion
        setSortField(field);
        setSortDirection(newSortDirection);
    };

    //busqueda de empleado
    const filteredEmployees = employees.filter((employee) => {
        return (
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    //array nuevo con empleados ordenados
    const sortedEmployees = filteredEmployees.sort(( a, b ) => {
        if(sortField){        //solo ordena si se especificó un campo para ordenar
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if( sortDirection === 'asc'){
                return fieldA > fieldB ? 1 : -1;//orden ascendente
            }else{
                return fieldA < fieldB ? 1 : -1;//orden descendente
            }
        }
        return 0;//en caso de no haber campo, no cambia el orden
    });

    if (employees.length === 0) {
        return (
            <div className="alert alert-info">
                No hay empleados disponibles
            </div>);
    }

    return (
        <div>
            <h2 className="mb-4">Lista de empleados</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table table-striped">
                <thead>

                    <tr>
                        <th onClick={() => handleSort('firstName')}>Nombre</th>
                        <th onClick={() => handleSort('lastName')}>Apellido</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {/* se crea una copia de una porcion del array
                    devuelve los empleados del 0 al 4 */}
                    {sortedEmployees.slice(pagesVisited, pagesVisited + employeesPerPage).map(employee => (
                        <tr key={employee.id}>
                            <td>
                                <Link
                                    className="employee-link"
                                    to={`/employees/${employee.id}`}>
                                    {employee.firstName}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className="employee-link"
                                    to={`/employees/${employee.id}`}>
                                    {employee.lastName}
                                </Link>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDeleteClick(employee.id)}
                                >Eliminar</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}

                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>


    );
};

export default EmployeeList;
