import { Link } from "react-router-dom";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import "../App.css";
import { FaMagic, FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2"

function ListFilm() {
  const {
    data: films,
    refetch,
    isLoading,
  } = useQuery("moviesListCache", async () => {
    const response = await API.get("/films");
    console.log(response);
    return response.data.data;
  });
 
  const deleteHandle = useMutation((id) => {
    try {
        Swal.fire({
            title: 'yakin menghapus?',
            text: "data tidak akan dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#FF00FF',
            confirmButtonText: 'Hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
              await API.delete(`/film/${id}`)
              console.log (id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                refetch()
            }
        })
    } catch (err) {
        console.error(err)
    }
})


  const GetlistFilm = () => {
    
    return films?.map((film, i) => {
      return (
        <div className="card bg-transparent btn-light" key={i}>
          <Link to={`/detail/${film?.id}`}>
            <img
              className="card-img-top"
              src={`${film.thumbnailfilm}`}
              alt={film?.title}
            />
          </Link>
          <div className="card-body bg-dark ">
            <h5 className="card-title text-white">{film?.title}</h5>
            <p className="card-text text-white">{film?.year}</p>
            <div className="d-flex justify-content-end">
            <Link to={`/updatemovie/${film.id}`} className="btn btn-success "><FaMagic/>
            Edit
            </Link>
            <button onClick={() => { deleteHandle.mutate(film?.id) }} className="btn btn-danger mx-3"><FaMinusCircle/>
            Delete
            </button>
            </div>
          </div>
        </div>
      );
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-cente">
            <h1 className="text-white">Film</h1>
          </div>

          <h4 className="text-light fw-semibold">List Film</h4>
          <br/>

          <div style={{flexWrap:"wrap"}} className="card-group d-flex gap-4 ">
            <GetlistFilm />
          </div>
        </div>
      </header>
    </div>
  );
}

export default ListFilm;

