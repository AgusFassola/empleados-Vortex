import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions, deletePosition } from '../../reducers/positionSlice';
import { Link} from 'react-router-dom';
import '../../index.css';
import ReactPaginate from "react-paginate";
//import axios from 'axios';

const PositionList = () => {
    const dispatch = useDispatch();
    const { positions, loading, error } = useSelector(state => state.positions);


    //recarga la lista de puestos cuando hay un cambio
    useEffect(() => {
        dispatch(fetchPositions());
    }, [dispatch]);

    const handleDeleteClick = async (id) => {

        if (window.confirm("¿Estás seguro de que deseas eliminar este puesto?")) {
            dispatch(deletePosition(id));
        }
    };

    

    //PARA ORDENAR
    const [ sortField, setSortField ] = useState(null);
    const [ sortDirection, setSortDirection ] = useState('asc');

    const handleSort = (field) => {
        const newSortDirection = 
            sortField === field &&
            sortDirection === 'asc' ? 'desc' : 'asc'
        //actualiza el campo y la direccion
        setSortField(field);
        setSortDirection(newSortDirection); 
    };

    //PARA BUSCAR
    const [ searchTerm, setSearchTerm ] = useState('');
   
       const filteredPositions = positions.filter((position) => {
            return (
                position.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    
    

    //PARA PAGINACION   
    const [pageNumber, setPageNumber] = useState(0);
    const positionsPerPage = 5;
    const pagesVisited = pageNumber * positionsPerPage;
    
    const pageCount =  Math.ceil(filteredPositions.length / positionsPerPage);//total de páginas necesarias redondeando para arriba
    const changePage = ({ selected }) => {
        setPageNumber(selected);//actualiza la página seleccionada
    };

    //array nuevo con puestos ordenados
    const sortedPositions = filteredPositions.sort(( a, b ) => {
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
    
    // Obtengo el rol del usuario desde el localStorage
    const token = localStorage.getItem("token");
    const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    if(loading){
        return <div className="alert alert-info">Cargando puestos...</div>;
    }

    if(error){
        return <div className="alert alert-danger">{error}</div>;
    }

    if (positions.length === 0) {
        return (
            <div className="alert alert-info">
                No hay puestos disponibles
            </div>);
    }

    return (
        <div>
            <h2 className="mb-4">Lista de puestos:</h2>
            {role === 'admin' && (
            <Link 
                to="/positions/new" className="btn btn-primary mb-3"
            >Nuevo puesto</Link> 
        )}
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
                        <th onClick={() => handleSort('title')}>Puesto</th>
                        {role === 'admin' && <th>Acción</th>}
                    </tr>
                </thead>
                <tbody>
                    {/* se crea una copia de una porcion del array
                    devuelve los puestos del 0 al 4 */}
                    {sortedPositions.slice(pagesVisited, pagesVisited + positionsPerPage).map(position => (
                        <tr key={position.id}>
                            <td>
                                <p
                                    className="position-link">
                                    {position.title}
                                    
                                </p>
                            </td>
                            {role === 'admin' && (
                                <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDeleteClick(position.id)}
                                >Eliminar</button>
                            </td>
                            )}
                            
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

export default PositionList;
